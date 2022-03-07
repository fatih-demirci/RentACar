using Business.Concrete;
using DataAccess.Concrete.EntityFramework;
using DataAccess.Concrete.InMemory;
using Entities.Concrete;
using System;

namespace ConsoleUI
{
    class Program
    {
        static void Main(string[] args)
        {
            CarManager carManager = new CarManager(new EfCarDal());
            BrandManager brandManager = new BrandManager(new EfBrandDal());
            ColorManager colorManager = new ColorManager(new EfColorDal());
            UserManager userManager = new UserManager(new EfUserDal());
            RentalManager rentalManager = new RentalManager(new EfRentalDal());
            CustomerManager customerManager = new CustomerManager(new EfCustomerDal());

            //carManager.Add(new Car() { Id=1,BrandId=1,ColorId=1,DailyPrice=1000,Description="car1",ModelYear=2022});
            //brandManager.Add(new Brand() {Id=1,Name="marka1" });
            //colorManager.Add(new Color() {Id=1,Name="renk1" });

            Console.WriteLine("GetAll");
            foreach (var car in carManager.GetCarsByColorId(1).Data)
            {
                Console.WriteLine(car.Description);
            }

            Console.WriteLine();

            Console.WriteLine("GetById");
            Console.WriteLine(carManager.GetById(1).Data.Description);

            Console.WriteLine("Update");
            carManager.Update(new Car()
            {
                Id = 1,
                BrandId = 1,
                ColorId = 1,
                DailyPrice = 1000,
                ModelYear = 2022,
                Description = "car1"
            });
            Console.WriteLine("GetById");
            Console.WriteLine(carManager.GetById(1).Data.Description);


            foreach (var car in carManager.GetCarDetails().Data)
            {
                Console.WriteLine("{0} - {1} - {2} - {3}",car.BrandName,car.CarDescription,car.ColorName,car.DailyPrice);
            }


            //var delete = carManager.GetById(1);
            //Console.WriteLine("Delete");
            //carManager.Delete(delete);
            //Console.WriteLine("GetById");
            //Console.WriteLine(carManager.GetById(1)==null?"silindi":"silinmedi");

            //Console.WriteLine("Add");
            //carManager.Add(new Car()
            //{
            //    Id = 5,
            //    BrandId = 2,
            //    ColorId = 9,
            //    DailyPrice = 1000,
            //    ModelYear = 1970,
            //    Description = "car5"
            //});
            //Console.WriteLine(carManager.GetById(5).Description);


            foreach (var brand in brandManager.GetAll().Data)
            {
                Console.WriteLine(brand.Name);
            }


            //userManager.Add(new User()
            //{
            //    FirstName = "name2",
            //    LastName = "lastName2",
            //    Email = "name2LastName2@mail.com",
            //    Password = "123name2"
            //});

            foreach (var user in userManager.GetAll().Data)
            {
                Console.WriteLine(user.FirstName);
            }

            //customerManager.Add(new Customer()
            //{
            //    UserId = 2,
            //    CompanyName = "compName2",
            //});

            foreach (var customer in customerManager.GetAll().Data)
            {
                Console.WriteLine(customer.CompanyName);
            }

            var rentalResult = rentalManager.Add(new Rental()
            {
                CarId = 1,
                CustomerId = 2,
                RentDate = DateTime.Now,
            });

            Console.WriteLine(rentalResult.Message);

            foreach (var rental in rentalManager.GetAll().Data)
            {
                Console.WriteLine(rental.RentDate);
            }


        }
    }
}
