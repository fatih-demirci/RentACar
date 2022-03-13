using Core.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Business
{
    public class BusinessRules
    {
        public static List<IResult> Run(params IResult[] logics) {
            List<IResult> result = new ();
            foreach (var logic in logics)
            {
                if (!logic.Success)
                {
                    result.Add(logic);
                }
            }
            return result;
        }

    }
}
