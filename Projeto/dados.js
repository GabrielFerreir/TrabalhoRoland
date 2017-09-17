

//REQUISIÇÂO
function reqListener () {
            dados = JSON.parse(this.responseText);
            console.log(dados)

            dadosValidos();
            nascimento();
            estadoCivil();
            deficiencia();
            cidade();
            locomocao();
            filhos();
            conhecimentoInformatica();
            conhecimentoLingua();

            mediaRenda();
            meio();
            moraCom();
            motivoVestibular();
            periodoEstudo();
            vidaEscolar();
            pessoasTrabalham();
            situacaoDomiciliar();
            tempoMoradia();
            trabalho();
        };

    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("get", "http://localhost:61179/api/datas", true);
    oReq.send();

// VALIDAÇÕES
    var dados;

//GRAFICOS DE DADOS VALIDOS
    validos = 0;
    invalidos = 0;
    
    function dadosValidos() {
        for(var i = 0; i < dados.length; i++) {
            if(dados[i].Validade == "Valido") {
                validos++;
            } else {
                invalidos++;
            }
        }
        objeto = {
                "Validos": validos,
                "Invalidos": invalidos
            }
            
            console.log("Validos: " + validos);
            console.log("Invalidos: " + invalidos);
            console.log("-------------------")
            gerarGrafico(objeto, 'Situação dos Dados', 'piechart');
    }
//NASCIMENTO

var DataDeNascimentoMenorDe20 = 0
var DataDeNascimentoAte30 = 0;
var DataDeNascimentoAte40 = 0;
var DataDeNascimentoMaior40 = 0;

function nascimento() {

        var d = new Date();
        var anoAtual = d.getFullYear();
        var mesAtual = d.getMonth() + 1;
        var diaAtual = d.getDate();

  for(var i=0; i < dados.length; i++) {
    if(dados[i].Validade == 'Valido') {
              var data = dados[i].Nascimento.split(' ');
      data = data[0].split('/');

       //MENOR DE 20
         if(data[2] > 1997 || data[2] == 1997 && data[1] < mesAtual ||
           data[2] == 1997 && data[1] == mesAtual && data[0] < diaAtual) {
            //  console.log("Menor de 20")
             DataDeNascimentoMenorDe20++;
         }
      //DE 21 Á 30
         else if (
           data[2] == 1997 && data[1] > mesAtual ||
           data[2] == 1997 && data[1] == mesAtual && data[0] >= diaAtual ||

           data[2] > 1987 || data[2] == 1987 && data[1] < mesAtual ||
           data[2] == 1987 && data[1] == mesAtual && data[0] < diaAtual
         ) {
            //  console.log("Entre 21 a 30");
              DataDeNascimentoAte30++;
         }
      //DE 31 Á 40
         else if (
           data[2] == 1987 && data[1] > mesAtual ||
           data[2] == 1987 && data[1] == mesAtual && data[0] >= diaAtual ||

           data[2] > 1977 || data[2] == 1977 && data[1] < mesAtual ||
           data[2] == 1977 && data[1] == mesAtual && data[0] < diaAtual
         ) {
            //  console.log("Entre 31 a 40");
             DataDeNascimentoAte40++;
         }
         else if (
           data[2] < 1977 ||
           data[2] == 1977 && data[1] > mesAtual ||
           data[2] == 1977 && data[1] == mesAtual && data[0] >= diaAtual
         ) {
          //  console.log("Maior de 40")
           DataDeNascimentoMaior40++
         }
    }

  }
  objeto = {
      "Menor de 20": DataDeNascimentoMenorDe20,
      "De 21 á 30": DataDeNascimentoAte30,
      "De 31 á 40": DataDeNascimentoAte40,
      "Maior que 40": DataDeNascimentoMaior40
  }
  gerarGrafico(objeto, 'Faixa etaria', 'piechart2');
  console.log("IDADES")
  console.log("Menor de 20: "+DataDeNascimentoMenorDe20)
  console.log("De 21 á 30: "+ DataDeNascimentoAte30)
  console.log("De 31 á 40: "+DataDeNascimentoAte40)
  console.log("Maior que 40: "+DataDeNascimentoMaior40)
  console.log("---------------")
 
}

// ESTADO CIVIL
var estadoCivilSolteiro = 0;
var estadoCivilCasado = 0;
var estadoCivilOutro = 0;

function estadoCivil() {
    
    for(var i=0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
            if(dados[i].EstadoCivil == "Solteiro(a)") {
                estadoCivilSolteiro++;
            } else if (dados[i].EstadoCivil == "Casado(a)") {
                estadoCivilCasado++;
            } else {
                estadoCivilOutro++;
            }
        }
    }
    objeto = {
        "Solteiro": estadoCivilSolteiro,
        "Casado": estadoCivilCasado,
        "Outro": estadoCivilOutro
    }
     gerarGrafico(objeto, 'Estado Civil', 'piechart3');

}

// DEFICIENCIA
deficienciaSim = 0;
deficienciaNao = 0;

function deficiencia() {
    for (var i = 0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
            if(dados[i].Deficiencia == "Não") {
            deficienciaNao++;
            } else {
            deficienciaSim++;
        }
    }
  }
      objeto = {
        "Sim": deficienciaSim,
        "Não": deficienciaNao
    }
     gerarGrafico(objeto, 'Deficiencia', 'piechart4');
}

//CIDADE
var ResideEmFrancaSim = 0;
var ResideEmFrancaNao = 0;

function cidade() {
  for (var i = 0; i < dados.length; i++) {
    if(dados[i].Validade == 'Valido') {
        if(dados[i].Cidade == "Franca") {
        ResideEmFrancaSim++;
        } else {
        ResideEmFrancaNao++;
        }
    }
  }
  objeto = {
      "Franca": ResideEmFrancaSim,
      "Região de Franca": ResideEmFrancaNao
  }
  gerarGrafico(objeto, 'Onde Reside', 'piechart5');
}

//LOCOMOÇÂO
var locomocaoMoto = 0;
var locomocaoOnibus = 0;
var locomocaoCarro = 0;
var locomocaoAndando = 0;
var locomocaoBicicleta = 0;

function locomocao() {
  for (var i = 0; i < dados.length; i++) {
    if(dados[i].Validade == 'Valido') {
        if(dados[i].Locomocao == "Moto") {
        // locomocaoVeiculoProprio++;
        locomocaoMoto++;
        } else if (dados[i].Locomocao == "Ônibus") {
        // locomocaoColetivo++;
        locomocaoOnibus++;
        } else if (dados[i].Locomocao == "Carro") {
        // locomocaoVeiculoProprio++;
        locomocaoCarro++;
        } else if (dados[i].Locomocao == "Andando") {
        // locomocaoSemConducao++;
        locomocaoAndando++;
        } else if (dados[i].Locomocao == "Bicicleta") {
        // locomocaoSemConducao++;
        locomocaoBicicleta++;
        }
    }
  }
  objeto = {
      "Moto": locomocaoMoto,
      "Carro": locomocaoCarro,
      "Ônibus": locomocaoOnibus,
      "Andando": locomocaoAndando,
      "Bicicleta": locomocaoBicicleta
  }
  gerarGrafico(objeto, 'Locomoção', 'piechart6');

}

//FILHOS
filhosNao = 0;
filhos1 = 0;
filhos2 = 0;
filhos3 = 0;
filhosX = 0;
function filhos() {
    for (var i = 0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
            if(dados[i].Filhos == "Não tem filhos") {
                filhosNao++;
            } else if(dados[i].Filhos == "1") {
                filhos1++;
            } else if(dados[i].Filhos == "2") {
                filhos2++;
            } else if(dados[i].Filhos == "3") {
                filhos3++;
            }  else {
                filhosX++;
            }
        }
    }
    objeto = {
        "Não tem": filhosNao,
        "Um": filhos1,
        "Dois": filhos2,
        "Três": filhos3,
        "Mais de 3": filhosX
    }
    gerarGrafico(objeto, 'Filhos', 'piechart7');
}

// CONHECIMENTO EM INFORMATICA

var informaticaBasico = 0;
var informaticaIntermediario = 0;
var informaticaAvancado = 0;
function conhecimentoInformatica() {
        for (var i = 0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
                console.log(dados[i].ConhecimentoInformatica);
                if(dados[i].ConhecimentoInformatica == "Básico") {
                    informaticaBasico++;
                }else if(dados[i].ConhecimentoInformatica == "Intermediario") {
                    informaticaIntermediario++;
                } else if(dados[i].ConhecimentoInformatica == "Avançado") {
                    informaticaAvancado++;
                }
        }
    }
    objeto = {
        "Basico": informaticaBasico,
        "Intermediario": informaticaIntermediario,
        "Avançado": informaticaAvancado
    }
    gerarGrafico(objeto, 'Conhecimento de Informatica', 'piechart8');
}

//CONHECIMENTO LINGUAS
var linguaSim = 0;
var linguaNao = 0;

function conhecimentoLingua() {
    for (var i = 0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
            if(dados[i].ConhecimentoLingua == "Sim") {
                linguaSim++;
            }else if(dados[i].ConhecimentoLingua == "Não") {
                linguaNao++;
            }
        }
    }
    objeto = {
        "Sim": linguaSim,
        "Não": linguaNao
    }
    gerarGrafico(objeto,'Conhecimento em alguma Lingua', 'piechart9');
}
// LINGUAS

function linguas() {

}


// RENDA MEDIA
    var rendaMedia1 = 0;
    var rendaMedia2 = 0;
    var rendaMedia3 = 0;
    var rendaMedia4oumais = 0;

function mediaRenda() {
    for (var i = 0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
            if(dados[i].MediaRenda == "1") {
                rendaMedia1++;
            } else if(dados[i].MediaRenda == "2") {
                rendaMedia2++
            } else if(dados[i].MediaRenda == "3") {
                rendaMedia3++
            } else if(dados[i].MediaRenda == "4 ou mais") {
                rendaMedia4oumais++
            }
        }
    }
    objeto = {
        "Um": rendaMedia1,
        "Dois": rendaMedia2,
        "Três": rendaMedia3,
        "4 ou Mais": rendaMedia4oumais
    }
    gerarGrafico(objeto, 'Renda Media', 'piechart11');
}

//MEIO 

var meioAPP = 0;
var meioWeb = 0;
function meio() {
for (var i = 0; i < dados.length; i++) {
    if(dados[i].Validade == 'Valido') {
        if(dados[i].Meio == "APP") {
            meioAPP++;
        } else if(dados[i].Meio == "Web") {
            meioWeb++;
        }
    }
}
objeto = {
    "Aplicativo": meioAPP,
    "Web": meioWeb
}
gerarGrafico(objeto, 'Por onde acessou o formulario', 'piechart12');
}

//MORA COM

var moraComFamilia = 0;
var moraComSozinho = 0;
var moraComRepublica = 0;

function moraCom() {
    for (var i = 0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
            if(dados[i].MoraCom == "Família") {
                moraComFamilia++;
            } else if(dados[i].MoraCom == "Sozinho") {
                moraComSozinho++;
            } else if(dados[i].MoraCom == "Republica") {
                moraComRepublica++;
            }
        }
    }

    objeto = {
        "Familia": moraComFamilia,
        "Republica": moraComRepublica,
        "Sozinho": moraComSozinho
    }
    gerarGrafico(objeto, 'Com quem mora', 'piechart13');
}

//MOTIVO VESTIBULAR
var motivoVestInteresse = 0;
var motivoVestExperiencia = 0;
var motivoVestGratuidade = 0;
var motivoVestCertificacao = 0;
var motivoVestOutro = 0;

function motivoVestibular() {
    for (var i = 0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
            if(dados[i].MotivoVestibular == "Interesse na Área") {
                motivoVestInteresse++;
            } else if(dados[i].MotivoVestibular == "Experiência Profissional") {
                motivoVestExperiencia++
            } else if(dados[i].MotivoVestibular == "Gratuidade") {
                motivoVestGratuidade++;
            } else if(dados[i].MotivoVestibular == "Para obter alguma certificação") {
                motivoVestCertificacao++;
            } else if(dados[i].MotivoVestibular == "Outro") {
                motivoVestOutro++;
            }
            
        }
    }

    objeto = {
        "Interesse na Área": motivoVestInteresse,
        "Experiência Profissional": motivoVestExperiencia,
        "Gratuidade": motivoVestGratuidade,
        "Para obter alguma certificação": motivoVestCertificacao,
        "Outro": motivoVestOutro
    }
    gerarGrafico(objeto, 'Motivo de ter feito o Vestibular', 'piechart14');
}

// PERIODO DE ESTUDO
var periodoNoturno = 0;
var periodoMatutino = 0;

function periodoEstudo() {
for (var i = 0; i < dados.length; i++) {
    if(dados[i].Validade == 'Valido') {
        if(dados[i].PeriodoEstudo == "Noturno") {
            periodoNoturno++;
        } else if(dados[i].PeriodoEstudo == "Matutino") {
            periodoMatutino++;
        }
    }
}
objeto = {
    "Noturno": periodoNoturno,
    "Matutino": periodoMatutino
}
gerarGrafico(objeto, 'Periodo que Estuda', 'piechart15');
}

// VIDA ESCOLAR
var vidaEscolarIEP = 0;
var vidaEscolarMEP = 0;
var vidaEscolarMEPar = 0;
var vidaEscolarIEPar = 0;

function vidaEscolar() {
    for (var i = 0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
            if(dados[i].VidaEscolar == "Integralmente em Escola Pública") {
                vidaEscolarIEP++;
            } else if(dados[i].VidaEscolar == "Maior parte em Escola Pública") {
                vidaEscolarMEP++;
            } else if(dados[i].VidaEscolar == "Maior parte em Escola Particular") {
                vidaEscolarMEPar++
            } else if(dados[i].VidaEscolar == "Integralmente em Escola Particular") {
                vidaEscolarIEPar++;
            }
        }
    }
    objeto = {
        "Integralmente em Escola Pública": vidaEscolarIEP,
        "Maior parte em Escola Pública": vidaEscolarMEP,
        "Maior parte em Escola Particular": vidaEscolarMEPar,
        "Integralmente em Escola Particular": vidaEscolarIEPar
    }
    gerarGrafico(objeto, 'Vida Escolar', 'piechart16');
}

// PESSOAS QUE TRABALHAM 
var pessoasTrabalham1 = 0;
var pessoasTrabalham2 = 0;
var pessoasTrabalham3 = 0;
var pessoasTrabalham4oumais = 0;

function pessoasTrabalham() {
    for (var i = 0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
            if(dados[i].PessoasTrabalham == "1") {
                pessoasTrabalham1++;
            } else if(dados[i].PessoasTrabalham == "2") {
                pessoasTrabalham2++
            } else if(dados[i].PessoasTrabalham == "3") {
                pessoasTrabalham3++
            } else if(dados[i].PessoasTrabalham == "4 ou mais") {
                pessoasTrabalham4oumais++
            }
        }
    }
    objeto = {
        "Um": pessoasTrabalham1,
        "Dois": pessoasTrabalham2,
        "Três": pessoasTrabalham3,
        "4 ou Mais": pessoasTrabalham4oumais
    }
    gerarGrafico(objeto, 'Pessoas que trabalham', 'piechart17');
}

// SITUAÇÃO DOMICILIAR
var situacaoDomiciliarProprio = 0;
var situacaoDomiciliarFinanciado = 0;
var situacaoDomiciliarAlugado = 0;

function situacaoDomiciliar() {
    for (var i = 0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
            if(dados[i].SituacaoDomiciliar == "Próprio") {
                situacaoDomiciliarProprio++;
            } else if(dados[i].SituacaoDomiciliar == "Financiado") {
                situacaoDomiciliarFinanciado++;
            } else if(dados[i].SituacaoDomiciliar == "Alugado") {
                situacaoDomiciliarAlugado++;
            }
        }
    }
    objeto = {
        "Próprio": situacaoDomiciliarProprio,
        "Financiado": situacaoDomiciliarFinanciado,
        "Alugado": situacaoDomiciliarAlugado
    }
    gerarGrafico(objeto, 'Situação Domiciliar', 'piechart18');
}

// TEMPO MORADIA
var tempoMoradia1 = 0;
var tempoMoradia2 = 0;
var tempoMoradia3 = 0;
var tempoMoradia4oumais = 0;

function tempoMoradia() {
    for (var i = 0; i < dados.length; i++) {
        if(dados[i].Validade == 'Valido') {
            if(dados[i].TempoMoradia == "1") {
                tempoMoradia1++;
            } else if(dados[i].TempoMoradia == "2") {
                tempoMoradia2++
            } else if(dados[i].TempoMoradia == "3") {
                tempoMoradia3++
            } else if(dados[i].TempoMoradia == "4 ou mais") {
                tempoMoradia4oumais++
            }
        }
    }
    objeto = {
        "Um": tempoMoradia1,
        "Dois": tempoMoradia2,
        "Três": tempoMoradia3,
        "4 ou Mais": tempoMoradia4oumais
    }
    gerarGrafico(objeto, 'Tempo de Moradia', 'piechart19');
}

//TRABALHO 
var trabalhoNNTAC = 0;
var trabalhoSTFAC = 0;
var trabalhoSTAC = 0;
var trabalhoNT = 0;
var trabalhoNJTAC = 0;

function trabalho() {
for (var i = 0; i < dados.length; i++) {
    if(dados[i].Validade == 'Valido') {
        if(dados[i].Trabalha == "Não. Nunca trabalhei na área do curso.") {
            trabalhoNNTAC++;
        } else if(dados[i].Trabalha == "Sim. Trabalho fora da área do curso") {
            trabalhoSTFAC++;
        } else if(dados[i].Trabalha == "Sim. Trabalho na área do curso") {
            trabalhoSTAC++;
        } else if(dados[i].Trabalha == "Nunca trabalhei") {
            trabalhoNT++;
        } else if(dados[i].Trabalha == "Não. Já trabalhei na área do curso.") {
            trabalhoNJTAC++;
        }
    }
}
objeto = {
    "Não. Nunca trabalhei na área do curso": trabalhoNNTAC,
    "Sim. Trabalho fora da área do curso": trabalhoSTFAC,
    "Sim. Trabalho na área do curso": trabalhoSTAC,
    "Nunca trabalhei": trabalhoNT,
    "Não. Já trabalhei na área do curso": trabalhoNJTAC
}
gerarGrafico(objeto, 'Trabalho', 'piechart20');
}



// FUNÇÃO QUE GERA OS GRAFICOS
function gerarGrafico(dados, titulo, local) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(
        () => {

        var array = Array();
        array.push([titulo, '']);

        for (var obj in dados) {
            array.push([obj, dados[obj]]);
        }
        console.log(array);

        var data = google.visualization.arrayToDataTable(
            array
        );

        var options = {
        title: titulo
        };

        var chart = new google.visualization.PieChart(document.getElementById(local));

        chart.draw(data, options);
    }
    );



    }








