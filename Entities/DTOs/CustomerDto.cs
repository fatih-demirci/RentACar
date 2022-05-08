using Core.Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTOs
{
    public class CustomerDto : UserDto
    {
        public int CustomerId { get; set; }
        public string CompanyName { get; set; }

    }
}
