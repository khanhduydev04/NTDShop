using BE.DTOs;
using BE.Models;
using Microsoft.EntityFrameworkCore;

public class AddressService
{
    private readonly ApplicationDbContext _context;

    public AddressService(ApplicationDbContext context)
    {
        _context = context;
    }

    // Lấy địa chỉ mặc định của người dùng
    public async Task<Address?> GetDefaultAddressAsync(string userId)
    {
        return await _context.Address
            .FirstOrDefaultAsync(a => a.UserId == userId && a.IsDefault);
    }

    // Lấy địa chỉ khi đặt hàng (sử dụng địa chỉ mặc định hoặc địa chỉ được chọn)
    public async Task<Address?> GetOrderAddressAsync(string userId, int? selectedAddressId = null)
    {
        if (selectedAddressId.HasValue)
        {
            // Lấy địa chỉ được chọn
            var selectedAddress = await _context.Address
                .FirstOrDefaultAsync(a => a.Id == selectedAddressId && a.UserId == userId);
            if (selectedAddress != null)
                return selectedAddress;
        }

        // Nếu không có địa chỉ được chọn, lấy địa chỉ mặc định
        return await GetDefaultAddressAsync(userId);
    }

    // Tạo địa chỉ mới
    public async Task<Address> CreateAddressAsync(Address address)
    {
        address.CreatedAt = DateTime.UtcNow;

        // Kiểm tra xem người dùng đã có địa chỉ nào chưa
        var existingAddress = await _context.Address.FirstOrDefaultAsync(a => a.UserId == address.UserId);

        // Nếu người dùng chưa có địa chỉ nào, gán địa chỉ mới là mặc định
        if (existingAddress == null)
        {
            address.IsDefault = true;
        }
        else
        {
            address.IsDefault = false; // Nếu đã có địa chỉ, thì không cần cài mặc định
        }

        _context.Address.Add(address);
        await _context.SaveChangesAsync();
        return address;
    }


    // Lấy danh sách tất cả địa chỉ của người dùng
    public async Task<List<Address>> GetAllAddressAsync(string userId)
    {
        return await _context.Address
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.IsDefault) // Sắp xếp địa chỉ mặc định lên đầu
            .ToListAsync();
    }


    // Cập nhật địa chỉ
    public async Task<Address?> UpdateAddressAsync(int addressId, AddressUpdate updatedAddressDto, Address existingAddress)
    {
        if (existingAddress == null) return null;

        // Giữ lại thông tin UserId cũ
        updatedAddressDto.UserId ??= existingAddress.UserId;

        // Cập nhật các trường không rỗng từ DTO
        existingAddress.Name = updatedAddressDto.Name ?? existingAddress.Name;
        existingAddress.FullAddress = updatedAddressDto.FullAddress ?? existingAddress.FullAddress;
        existingAddress.Phone = updatedAddressDto.Phone ?? existingAddress.Phone;

        if (updatedAddressDto.IsDefault.HasValue && updatedAddressDto.IsDefault.Value && !existingAddress.IsDefault)
        {
            // Nếu đánh dấu là mặc định, hủy mặc định của các địa chỉ khác
            await UnsetDefaultAddressAsync(existingAddress.UserId);
        }
        existingAddress.IsDefault = updatedAddressDto.IsDefault ?? existingAddress.IsDefault;
        existingAddress.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return existingAddress;
    }


    // Xóa địa chỉ
    public async Task<bool> DeleteAddressAsync(int addressId)
    {
        var address = await _context.Address.FirstOrDefaultAsync(a => a.Id == addressId);
        if (address == null) return false;

        _context.Address.Remove(address);
        await _context.SaveChangesAsync();
        return true;
    }

    // Đặt địa chỉ mặc định
    public async Task SetDefaultAddressAsync(int addressId, string userId)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        // Kiểm tra xem người dùng đã có địa chỉ mặc định chưa
        var currentDefaultAddress = await _context.Address
            .FirstOrDefaultAsync(a => a.UserId == userId && a.IsDefault);

        if (currentDefaultAddress != null)
        {
            // Nếu có địa chỉ mặc định, set IsDefault = false cho địa chỉ hiện tại
            currentDefaultAddress.IsDefault = false;
            _context.Address.Update(currentDefaultAddress);
        }

        // Đặt địa chỉ mới làm mặc định
        var selectedAddress = await _context.Address
            .FirstOrDefaultAsync(a => a.Id == addressId && a.UserId == userId);
        if (selectedAddress == null)
        {
            throw new Exception("Không tìm thấy địa chỉ.");
        }

        selectedAddress.IsDefault = true;
        selectedAddress.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        await transaction.CommitAsync();
    }


    // Hủy mặc định tất cả địa chỉ của người dùng
    private async Task UnsetDefaultAddressAsync(string userId)
    {
        var userAddresses = await _context.Address
            .Where(a => a.UserId == userId && a.IsDefault)
            .ToListAsync();

        foreach (var address in userAddresses)
        {
            address.IsDefault = false;
        }

        await _context.SaveChangesAsync();
    }

    // Lấy địa chỉ theo Id
    public async Task<Address?> GetAddressByIdAsync(int addressId)
    {
        return await _context.Address.FirstOrDefaultAsync(a => a.Id == addressId);
    }

}
