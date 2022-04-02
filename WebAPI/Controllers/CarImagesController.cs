using Business.Abstract;
using Core.Utilities.Upload.Image;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarImagesController : ControllerBase
    {
        ICarImageService _carImageService;
        IHostEnvironment _hostEnvironment;

        public CarImagesController(ICarImageService carImageService, IHostEnvironment hostEnvironment)
        {
            _carImageService = carImageService;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var result = _carImageService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            var result = _carImageService.GetById(id,_hostEnvironment);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("Add")]
        public IActionResult Add(int carId, IFormFile formFile)
        {
            var result = _carImageService.Add(carId, _hostEnvironment, formFile);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("Update")]
        public IActionResult Update(int carImageId,IFormFile formFile)
        {
            var result = _carImageService.Update(carImageId, _hostEnvironment, formFile);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("Delete")]
        public IActionResult Delete(CarImage carImage)
        {
            var result = _carImageService.Delete(carImage,_hostEnvironment);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
