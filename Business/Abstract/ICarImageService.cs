using Core.Utilities;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ICarImageService
    {
        IDataResult<List<CarImage>> GetAll();
        IDataResult<List<byte[]>> GetById(int carId, IHostEnvironment hostEnvironment);
        IDataResult<byte[]> GetFirstImageById(int carId, IHostEnvironment hostEnvironment);
        IResult Add(int carId, IHostEnvironment hostEnvironment, IFormFile formFile);
        IResult Update(int carImageId, IHostEnvironment hostEnvironment, IFormFile formFile);
        IResult Delete(CarImage carImage, IHostEnvironment hostEnvironment);
    }
}
