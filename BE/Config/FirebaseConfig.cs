using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using System.IO;
using Newtonsoft.Json.Linq;

namespace BE.Config
{
    public class FirebaseConfig
    {
        public static StorageClient InitializeFirebase()
        {
            // Đọc file firebase.json để lấy đường dẫn tới file Service Account JSON
            var firebaseConfigPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "firebase.json");

            if (!File.Exists(firebaseConfigPath))
            {
                throw new FileNotFoundException("firebase.json file not found at the specified location.");
            }

            var jsonConfig = JObject.Parse(File.ReadAllText(firebaseConfigPath));
            var serviceAccountKeyPath = jsonConfig["serviceAccountKeyPath"].ToString();

            // Kiểm tra nếu FirebaseApp đã được khởi tạo hay chưa
            if (FirebaseApp.DefaultInstance == null)
            {
                // Khởi tạo FirebaseApp với Service Account JSON
                FirebaseApp.Create(new AppOptions
                {
                    Credential = GoogleCredential.FromFile(serviceAccountKeyPath),
                });
            }

            // Tạo và trả về StorageClient
            return StorageClient.Create(GoogleCredential.FromFile(serviceAccountKeyPath));
        }
    }
}
