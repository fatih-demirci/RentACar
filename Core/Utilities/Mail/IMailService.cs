﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Mail
{
    public interface IMailService
    {
        void Send(EmailMessage emailMessage);
    }
}
