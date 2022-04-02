using Business.Abstract;
using Business.Constants;
using Core.Utilities.Business;
using Core.Utilities;
using Core.Utilities.Upload.Image;
using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CarImageManager : ICarImageService
    {
        ICarImageDal _carImageDal;

        public CarImageManager(ICarImageDal carImageDal)
        {
            _carImageDal = carImageDal;
        }

        public IResult Add(int carId, IHostEnvironment hostEnvironment, IFormFile formFile)
        {

            var carImages = _carImageDal.GetAll(ci => ci.CarId == carId);

            var errors = BusinessRules.Run(CheckIfCarImageLimitExceeded(carImages.Count), CheckIfCarExist(carImages));

            if (errors.Count > 0)
            {
                ErrorResult errorResult = new ErrorResult();
                foreach (var error in errors)
                {
                    errorResult.Message += $"{error.Message} ";
                }
                return errorResult;
            }

            if (carImages.Count == 1)
            {
                if (carImages[0].ImagePath == "default_car")
                {
                    _carImageDal.Delete(carImages[0]);
                }
            }

            CarImage carImage = new CarImage();
            string result;
            ImageUpload imageUpload;
            if (formFile != null)
            {
                imageUpload = new ImageUpload(hostEnvironment);
                result = imageUpload.Upload(formFile);
            }
            else
            {
                result = "default_car";
            }

            carImage.CarId = carId;
            carImage.Date = DateTime.Now;
            carImage.ImagePath = result;
            _carImageDal.Add(carImage);
            return new SuccessResult();

        }

        public IResult Delete(CarImage carImage, IHostEnvironment hostEnvironment)
        {
            _carImageDal.Delete(carImage);
            ImageUpload.Delete(carImage.ImagePath);
            if (GetById(carImage.CarId, hostEnvironment).Data == null)
            {
                Add(carImage.CarId, null, null);
            }

            return new SuccessResult(Messages.CarImageDeleted);
        }

        public IDataResult<List<CarImage>> GetAll()
        {
            return new SuccessDataResult<List<CarImage>>(_carImageDal.GetAll());
        }

        public IDataResult<List<byte[]>> GetById(int carId, IHostEnvironment hostEnvironment)
        {
            var carImages = _carImageDal.GetAll(ci => ci.CarId == carId);
            List<byte[]> result = new List<byte[]>();
            if (carImages != null)
            {
                ImageUpload imageUpload = new ImageUpload(hostEnvironment);
                foreach (var carImage in carImages)
                {
                    byte[] image = imageUpload.GetById(carImage.ImagePath);
                    result.Add(image);
                }
                
                return new SuccessDataResult<List<byte[]>>(result);
            }
            return new ErrorDataResult<List<byte[]>>();
        }

        public IResult Update(int carImageId, IHostEnvironment hostEnvironment, IFormFile formFile)
        {
            var result = _carImageDal.Get(ci => ci.Id == carImageId);
            if (result==null)
            {
                return new ErrorResult();
            }
            Delete(result,hostEnvironment);
            Add(result.CarId, hostEnvironment, formFile);
            return new SuccessResult(Messages.CarImageUpdated);
        }



        private IResult CheckIfCarExist(List<CarImage> carImages)
        {
            if (carImages.Count == 0)
            {
                return new ErrorResult(Messages.CarNotExists);
            }
            return new SuccessResult();
        }

        private IResult CheckIfCarImageLimitExceeded(int count)
        {
            if (count > 4)
            {
                return new ErrorResult(Messages.CarImagesLimitExceeded);
            }
            return new SuccessResult();
        }

    }
}
