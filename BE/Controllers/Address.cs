using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using BE.Models;
using BE.DTOs;

[ApiController]
[Route("api/address")]
public class AddressController : ControllerBase
{
    private readonly AddressService _addressService;

    public AddressController(AddressService addressService)
    {
        _addressService = addressService;
    }

    // Lấy địa chỉ mặc định khi đặt hàng
    [HttpGet("order/default/{userId}")]
    public async Task<IActionResult> GetDefaultAddressForOrder(string userId)
    {
        var defaultAddress = await _addressService.GetDefaultAddressAsync(userId);
        if (defaultAddress == null)
            return Ok(new { message = "chưa có địa chỉ mặc định nào được thiết lập." });

        return Ok(defaultAddress);
    }

    // Đổi địa chỉ cho đơn hàng
    [HttpGet("order/select/{userId}/{addressId}")]
    public async Task<IActionResult> SelectAddressForOrder(string userId, int addressId)
    {
        var selectedAddress = await _addressService.GetOrderAddressAsync(userId, addressId);
        if (selectedAddress == null)
            return NotFound(new { message = "Địa chỉ được chọn không hợp lệ." });

        return Ok(new { message = "Địa chỉ đã được chọn cho đơn hàng.", address = selectedAddress });
    }

    // Tạo địa chỉ mới
    [HttpPost()]
    public async Task<IActionResult> CreateAddress([FromBody] Address address)
    {
        if (address == null || string.IsNullOrEmpty(address.UserId))
            return BadRequest(new { message = "Dữ liệu đầu vào không hợp lệ." });

        try
        {
            var createdAddress = await _addressService.CreateAddressAsync(address);
            return Ok(new { message = "Thêm địa chỉ mới thành công.", address = createdAddress });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }



    // Lấy danh sách tất cả địa chỉ của người dùng
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetAllAddresses(string userId)
    {
        var addresses = await _addressService.GetAllAddressAsync(userId);
        if (addresses.Count == 0)
            return Ok(new { message = "Người dùng chưa có địa chỉ nào." });

        return Ok(addresses);
    }

    // Cập nhật địa chỉ
    [HttpPatch("{addressId}")]
    public async Task<IActionResult> UpdateAddress(int addressId, [FromBody] AddressUpdate updatedAddressDto)
    {
        if (updatedAddressDto == null || addressId <= 0)
            return BadRequest(new { message = "Dữ liệu đầu vào không hợp lệ." });

        try
        {
            // Lấy địa chỉ hiện tại từ cơ sở dữ liệu
            var existingAddress = await _addressService.GetAddressByIdAsync(addressId);
            if (existingAddress == null)
                return NotFound(new { message = "Không tìm thấy địa chỉ để cập nhật." });

            // Chuyển đổi DTO thành Address và cập nhật các trường cần thiết
            var updated = await _addressService.UpdateAddressAsync(addressId, updatedAddressDto, existingAddress);

            return Ok(new { message = "Cập nhật địa chỉ thành công.", address = updated });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }


    // Xóa địa chỉ
    [HttpDelete("{addressId}")]
    public async Task<IActionResult> DeleteAddress(int addressId)
    {
        if (addressId <= 0)
            return BadRequest(new { message = "Dữ liệu đầu vào không hợp lệ." });
          
        try
        {
            var result = await _addressService.DeleteAddressAsync(addressId);
            if (!result)
                return NotFound(new { message = "Không tìm thấy địa chỉ để xóa." });

            return Ok(new { message = "Xóa địa chỉ thành công." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // Đặt địa chỉ mặc định
    [HttpPatch("default/{addressId}")]
    public async Task<IActionResult> SetDefaultAddress(string userId, int addressId)
    {
        if (string.IsNullOrEmpty(userId) || addressId <= 0)
            return BadRequest(new { message = "Dữ liệu đầu vào không hợp lệ." });

        try
        {
            await _addressService.SetDefaultAddressAsync(addressId, userId);
            return Ok(new { message = "Đặt địa chỉ mặc định thành công." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

}
