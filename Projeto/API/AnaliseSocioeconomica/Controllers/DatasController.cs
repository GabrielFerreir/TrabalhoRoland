using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Table;

namespace AnaliseSocioeconomica.Controllers
{
    public class DatasController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Get()
        {
                TreatsData DataT = new TreatsData(@"C:\Users\POSITIVO\Desktop\Base de Dados.xlsx");

                //metodo q elimina duplicidade
                DataT.DuplicityEliminate();

                //metodo elimina duplicidades sem logica 
                DataT.mergeTable("Qual a media da sua renda? (Em Salários Mínimos)",
                    "Incluindo você, qual a soma da renda das pessoas que residem com você?",
                    "Qual a media da sua renda? (Em Salários Mínimos)");

                DataT.mergeTable("Como você respondeu na pergunta acima que estuda no periodo matutino, em qual período exerce atividade remunerada:",
                   "Como você respondeu na pergunta acima que estuda no periodo noturno, em qual período exerce atividade remunerada:",
                   "Em qual período exerce atividade remunerada:");

                DataT.format();
                //metodo q preenche os campos vazios com null
                DataT.TreatsNull();


                //salva as alteracoes 
                DataT.Save();

                //fecha a a conexao
                DataT.CloseExcel();

                ValidateData Validate = new ValidateData(@"C:\Users\POSITIVO\Desktop\Base de Dados.xlsx");

                Validate.validateEmail();

                Validate.validateIdade();

                Validate.validateDuplic();

                Validate.validateAll();

                Validate.Save();

                Validate.Close();

                ConvertData Cdata = new ConvertData(@"C:\Users\POSITIVO\Desktop\Base de Dados.xlsx");

                var datas = Cdata.CreateList();

                return Ok(datas);
        }
        
    }
}
