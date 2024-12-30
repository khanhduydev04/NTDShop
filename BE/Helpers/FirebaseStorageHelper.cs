using Google.Cloud.Storage.V1;
using System;
using System.IO;
using System.Threading.Tasks;
using BE.Config;

namespace BE.Helpers
{
    public class FirebaseStorageHelper
    {
        private readonly string _bucketName = "ecma-722ac.appspot.com"; // Thay bằng tên Bucket của bạn
        private readonly StorageClient _storageClient;

        public FirebaseStorageHelper()
        {
            // Khởi tạo Firebase Storage Client
            _storageClient = FirebaseConfig.InitializeFirebase();
        }

        public async Task<string> UploadImageAsync(IFormFile file, string folderName)
        {
            try
            {
                // Lấy contentType trực tiếp từ IFormFile
                var contentType = file.ContentType;

                // Tạo tên đối tượng lưu trữ trong Firebase Storage
                var objectName = $"{folderName}/{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}_{file.FileName}";

                // Upload tệp lên Firebase Storage với contentType
                await _storageClient.UploadObjectAsync(
                    _bucketName,
                    objectName,
                    contentType, // MIME type
                    file.OpenReadStream(),
                    new UploadObjectOptions
                    {
                        PredefinedAcl = PredefinedObjectAcl.PublicRead // Thêm quyền public
                    }
                );

                // Tạo URL công khai
                var publicUrl = $"https://storage.googleapis.com/{_bucketName}/{objectName}";
                return publicUrl;
            }
            catch (Exception ex)
            {
                // Ghi log chi tiết lỗi
                throw new Exception($"Error uploading file {file.FileName}: " + ex.Message, ex);
            }
        }

        public async Task DeleteImageAsync(string publicUrl)
        {
            try
            {
                // Lấy đường dẫn tệp từ URL công khai
                var filePath = publicUrl.Replace($"https://storage.googleapis.com/{_bucketName}/", "");
                await _storageClient.DeleteObjectAsync(_bucketName, filePath);
            }
            catch (Exception ex)
            {
                throw new Exception("Error deleting file from Firebase: " + ex.Message, ex);
            }
        }
    }
}