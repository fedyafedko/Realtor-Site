using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Realtor.BLL.AutoMapper;
using Realtor.BLL.Interfaces;
using Realtor.BLL.Service;
using Realtor.DAL.Entities;
using Realtor.DAL.Repositories.Interfaces;
using RealtorAPI.Common.DTO;
using RealtorAPI.Common.DTO.Apartment;
using RealtorAPI.Controllers;
using Xunit;

namespace UnitTest;

public class RealtorControllerTest
{
    private readonly Mock<IApartmentsRepository> _mockRepo;
    private readonly ApartmentController _controller;

    public RealtorControllerTest()
    {
        var mapper = new MapperConfiguration(cfg => cfg.AddProfile<ApartmentProfile>()).CreateMapper();
        _mockRepo = new Mock<IApartmentsRepository>();
        IApartmentService service = new ApartmentService(_mockRepo.Object, mapper);
        _controller = new ApartmentController(service);
    }

    [Fact]
    public void GetApartments_ModelEquality()
    {
        _mockRepo.Setup(repo => repo.GetAll())
            .Returns(new List<Apartment>()
            {
                new Apartment()
                {
                    UserId = 1,
                    Name = "Sell flat",
                    Address = "Agenl 20",
                    City = "Kyiv",
                    Images = "Image 1",
                    NumberRoom = 3,
                    Square = 60,
                    Floor = 8,
                    Description = "Sell flat!!! 15 minutes to metro station.",
                    Price = "200000$",
                    Email = "example@gmail.com",
                    Phone = "+380111111111"
                },
                new Apartment()
                {
                    UserId = 2,
                    Name = "Sell house",
                    Address = "Trysckavetska 10",
                    City = "Kyiv",
                    Images = "Image 2",
                    NumberRoom = 2,
                    Square = 40,
                    Floor = 10,
                    Description = "Sell house!!! 10 minutes to metro station.",
                    Price = "300000$",
                    Email = "example1@gmail.com",
                    Phone = "+380222222222"
                }
            });
        var result = _controller.GetAll() as OkObjectResult;
        List<ApartmentDTO> content = result?.Value as List<ApartmentDTO> ?? new List<ApartmentDTO>();
        Assert.IsType<List<ApartmentDTO>>(content);
        Assert.Equal(2, content.Count);
        Assert.Equal(1, content[0].UserId);
        Assert.Equal("Sell flat", content[0].Name);
        Assert.Equal("Agenl 20", content[0].Address);
        Assert.Equal("Kyiv", content[0].City);
        Assert.Equal("Image 1", content[0].Images);
        Assert.Equal(3, content[0].NumberRoom);
        Assert.Equal(60, content[0].Square);
        Assert.Equal(8, content[0].Floor);
        Assert.Equal("Sell flat!!! 15 minutes to metro station.", content[0].Description);
        Assert.Equal("200000$", content[0].Price);
        Assert.Equal("example@gmail.com", content[0].Email);
        Assert.Equal("+380111111111", content[0].Phone);

        Assert.Equal(2, content[1].UserId);
        Assert.Equal("Sell house", content[1].Name);
        Assert.Equal("Trysckavetska 10", content[1].Address);
        Assert.Equal("Kyiv", content[1].City);
        Assert.Equal("Image 2", content[1].Images);
        Assert.Equal(2, content[1].NumberRoom);
        Assert.Equal(40, content[1].Square);
        Assert.Equal(10, content[1].Floor);
        Assert.Equal("Sell house!!! 10 minutes to metro station.", content[1].Description);
        Assert.Equal("300000$", content[1].Price);
        Assert.Equal("example1@gmail.com", content[1].Email);
        Assert.Equal("+380222222222", content[1].Phone);
    }

    [Fact]
    public async void InsertApartment_InvalidModelState_InsertDogNeverExecutes()
    {
        // Arrange
        var apartment = new CreateApartmentDTO
        {
            Name = "Sale Flat.",
            Address = "Trysckavetska 10",
            City = "Kyiv",
            Images = "Image 2",
            NumberRoom = 3,
            Square = 50,
            Floor = 1,
            Description = "Sell house!!! 10 minutes to metro station.",
            Price = "4000$",
            Email = "example1@gmail.com",
            Phone = "+380222222222"
        };

        // Act
        var result = await _controller.InsertApartment(apartment);

        // Assert
        _mockRepo.Verify(repo => repo.AddAsync(It.IsAny<Apartment>(), true), Times.Never);
        Assert.IsType<BadRequestObjectResult>(result);
    }
    [Fact]
    public async Task DeleteApartment_ReturnsOk()
    {
        // Arrange
        var apartment = new Apartment
        {
            Id = 3,
            Name = "Sale Flat.",
            Address = "Trysckavetska 10",
            City = "Kyiv",
            Images = "Image 2",
            NumberRoom = 3,
            Square = 50,
            Floor = 1,
            Description = "Sell house!!! 10 minutes to metro station.",
            Price = "4000$",
            Email = "example1@gmail.com",
            Phone = "+380222222222"
        };
        _mockRepo.Setup(repo => repo.FindAsync(3)).ReturnsAsync(apartment);
        _mockRepo.Setup(repo => repo.DeleteAsync(apartment, true)).ReturnsAsync(1);
        // Act
        var result = await _controller.DeleteApartment(3);
    
        // Assert
        Assert.IsType<OkResult>(result);
    }
    [Fact]
    public async Task DeleteApartment_ReturnsNotFound()
    {
        _mockRepo.Setup(repo => repo.FindAsync(3)).ReturnsAsync(value: null);

        var result = await _controller.DeleteApartment(2);

        Assert.IsType<NotFoundResult>(result);
    }
    [Fact]
    public async Task UpdateDog_UpdatesProps()
    {
        var apartment = new UpdateApartmentDTO()
        {
            Name = "Sale Flat.",
            Address = "Trysckavetska 10",
            City = "Kyiv",
            Images = "Image 2",
            NumberRoom = 3,
            Square = 50,
            Floor = 1,
            Description = "Sell house!!! 10 minutes to metro station.",
            Price = "4000$",
            Email = "example1@gmail.com",
            Phone = "+380222222222"
        };
        var entity = new Apartment()
        {
            Id = 45,
            Name = "Sale Flat.",
            Address = "Trysckavetska 10",
            City = "Kyiv",
            Images = "Image 2",
            NumberRoom = 3,
            Square = 50,
            Floor = 1,
            Description = "Sell house!!! 10 minutes to metro station.",
            Price = "4000$",
            Email = "example1@gmail.com",
            Phone = "+380222222222"
        };
        _mockRepo.Setup(repo => repo.FindAsync(45)).ReturnsAsync(entity);
    
        var result = await _controller.UpdateApartment(1013, apartment);
        var content = (result as OkObjectResult)?.Value as ApartmentDTO;
    
        Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(content);
        Assert.Equal(45, content.Id);
        Assert.Equal("Sell flat", content.Name);
        Assert.Equal("Agenl 20", content.Address);
        Assert.Equal("Kyiv", content.City);
        Assert.Equal("Image 1", content.Images);
        Assert.Equal(3, content.NumberRoom);
        Assert.Equal(60, content.Square);
        Assert.Equal(8, content.Floor);
        Assert.Equal("Sell flat!!! 15 minutes to metro station.", content.Description);
        Assert.Equal("200000$", content.Price);
        Assert.Equal("example@gmail.com", content.Email);
        Assert.Equal("+380111111111", content.Phone);
    }
    [Fact]
    public async Task UpdateDog_InvalidName_ReturnsBadRequest()
    {
        var apartment = new UpdateApartmentDTO()
        {
            Name = "Sale Flat.",
            Address = "Trysckavetska 10",
            City = "Kyiv",
            Images = "Image 2",
            NumberRoom = 3,
            Square = 50,
            Floor = 1,
            Description = "Sell house!!! 10 minutes to metro station.",
            Price = "4000$",
            Email = "example1@gmail.com",
            Phone = "+380222222222"
        };
        _mockRepo.Setup(repo => repo.FindAsync(45)).ReturnsAsync(value: null);

        var result = await _controller.UpdateApartment(45, apartment);
        var content = (result as NotFoundObjectResult)?.Value as string;

        Assert.IsType<NotFoundObjectResult>(result);
        Assert.NotNull(content);
        Assert.Equal("45", content);
    }
}