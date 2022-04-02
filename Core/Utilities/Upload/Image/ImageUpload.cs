using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace Core.Utilities.Upload.Image
{
    public class ImageUpload
    {
        public IHostEnvironment _environment;

        public ImageUpload(IHostEnvironment environment)
        {
            _environment = environment;
        }

        public string Upload(IFormFile formFile)
        {
            if (formFile.Length > 0)
            {
                string uploadsFolder = Path.Combine(_environment.ContentRootPath, "wwwroot", "Images");
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + formFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (FileStream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    formFile.CopyTo(fileStream);
                    
                }

                return uniqueFileName;

            }
            else
            {
                return null;
            }

        }

        public static bool Delete(string path)
        {
            File.Delete(@"D:\saves\vs\ReCapProject\WebAPI\wwwroot\Images\"+path);
            return true;
        }

        public Byte[] GetById(string path)
        {
            string imagePath = Path.Combine(_environment.ContentRootPath, "wwwroot", "Images" , path);
            byte[] image = File.ReadAllBytes(imagePath);
            
            return image;
        }


    }
}
