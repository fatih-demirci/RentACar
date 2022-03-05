using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.InMemory
{
    public class InMemoryCarDal : ICarDal
    {
        private List<Car> _cars;
        public InMemoryCarDal()
        {
            _cars = new List<Car>();
            _cars.Add(new Car()
            {
                Id = 1,
                BrandId = 1,
                ColorId = 1,
                DailyPrice = 1000,
                ModelYear = 2022,
                Description = "car1"
            });
            _cars.Add(new Car()
            {
                Id = 2,
                BrandId = 1,
                ColorId = 5,
                DailyPrice = 800,
                ModelYear = 2021,
                Description = "car2"
            });
            _cars.Add(new Car()
            {
                Id = 3,
                BrandId = 2,
                ColorId = 3,
                DailyPrice = 500,
                ModelYear = 2020,
                Description = "car3"
            });
            _cars.Add(new Car()
            {
                Id = 4,
                BrandId = 2,
                ColorId = 7,
                DailyPrice = 200,
                ModelYear = 2021,
                Description = "car4"
            });
        }

        public List<Car> GetAll(Expression<Func<Car, bool>> filter = null)
        {
            return _cars;
        }
        public Car Get(Expression<Func<Car, bool>> filter)
        {
            return _cars.SingleOrDefault<Car>();
        }

        public void Add(Car car)
        {
            _cars.Add(car);
        }

        public void Update(Car car)
        {
            Car carToUpdate = _cars.SingleOrDefault(c=>c.Id==car.Id);
            _cars.Remove(carToUpdate);
            _cars.Add(car);
        }

        public void Delete(Car entity)
        {
            Car carToDelete = _cars.SingleOrDefault(c=>c.Id==entity.Id);
            _cars.Remove(carToDelete);
        }

        public List<CarDetailDto> GetCarDetails()
        {
            throw new NotImplementedException();
        }
    }
}
