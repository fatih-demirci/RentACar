using Castle.DynamicProxy;
using Core.Utilities.Interceptors;
using Core.Utilities.IoC;
using Core.Utilities.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Aspects.Autofac.Performance
{
    public class PerformanceAspect : MethodInterception
    {
        private int _interval;
        private Stopwatch _stopwatch;
        private IConfiguration _configuration;
        private IMailService _mailService;

        public PerformanceAspect(int interval)
        {
            _interval = interval;
            _stopwatch = ServiceTool.ServiceProvider.GetService<Stopwatch>();
            _configuration = ServiceTool.ServiceProvider.GetService<IConfiguration>();
            _mailService = ServiceTool.ServiceProvider.GetService<IMailService>();
        }

        protected override void OnBefore(IInvocation invocation)
        {
            _stopwatch.Start();
        }

        protected override void OnAfter(IInvocation invocation)
        {
            if (_stopwatch.Elapsed.TotalSeconds > _interval)
            {

                EmailMessage emailMessage = new EmailMessage();
                var to = new EmailAddress() { Address = _configuration.GetSection("EmailConfiguration").GetSection("SenderEmail").Value, Name = _configuration.GetSection("EmailConfiguration").GetSection("SenderName").Value };
                emailMessage.ToAddresses.Add(to);
                emailMessage.Content = $"Performance : {invocation.Method.DeclaringType.FullName}.{invocation.Method.Name}-->{_stopwatch.Elapsed.TotalSeconds}";
                emailMessage.Subject = "Performance";
                _mailService.Send(emailMessage);
            }
            _stopwatch.Reset();
        }
    }
}
