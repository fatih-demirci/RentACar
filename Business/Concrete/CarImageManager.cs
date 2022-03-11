using Business.Abstract;
using Business.Constants;
using Core.Business;
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

        public IResult Delete(CarImage carImage)
        {
            _carImageDal.Delete(carImage);
            ImageUpload.Delete(carImage.ImagePath);
            if (GetById(carImage.CarId).Data == null)
            {
                Add(carImage.CarId, null, null);
            }

            return new SuccessResult(Messages.CarImageDeleted);
        }

        public IDataResult<List<CarImage>> GetAll()
        {
            return new SuccessDataResult<List<CarImage>>(_carImageDal.GetAll());
        }

        public IDataResult<CarImage> GetById(int id)
        {
            var result = _carImageDal.Get(ci => ci.Id == id);
            if (result != null)
            {
                return new SuccessDataResult<CarImage>(result);
            }
            return new ErrorDataResult<CarImage>();
        }

        public IResult Update(int carImageId, IHostEnvironment hostEnvironment, IFormFile formFile)
        {
            var result = GetById(carImageId);
            if (!result.Success)
            {
                return new ErrorResult();
            }
            Delete(result.Data);
            Add(result.Data.CarId, hostEnvironment, formFile);
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
