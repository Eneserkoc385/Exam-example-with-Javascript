function Soru(soruMetni, cevaplar, dogruCevap ){
    this.soruMetni = soruMetni;
    this.cevaplar = cevaplar;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function(cevap) {
  return cevap === this.dogruCevap
}  


let sorular = [
  new Soru ,
  new Soru("1-)Tarihte ilk parayı hangi uygarlık bulmuş ve kullanmıştır?", { a: "Lidya", b: "Sümer", c: "İyon" , d: "Mısır" }, "a"),
  new Soru("2-)Kazakistan'ın para birimi hangisidir?", { a: "Lari", b: "Riel", c: "Tenge", d: "Manat" }, "c"),
  new Soru("3-) Uzaktan kumanda ilk kez hangi ülkede kullanılmıştır?", { a: "Almanya", b: "İngiltere", c: "Amerika", d: "Hindistan" }, "c"),
  new Soru("4-) 1 milyar saniye kaç yıldır?", { a: "32 yıl", b: "29 yıl", c: " 41yıl", d: "43 yıl" }, "a"),
  new Soru("5-) Hamileliğin kaçıncı ayında bebeğin kalbi kan pompalamaya başlar?", { a: "4", b: "5", c: " 6", d: "7" }, "c"),
  new Soru("6-) Bir eserin teknik olarak kitap sayılabilmesi için en az kaç sayfadan oluşması gerekir?", { a: "1", b: "3", c: " 32", d: "49" }, "d"),
  new Soru("7-) Divan edebiyatında şairler hakkında bilgi veren eserlere ne ad verilir?", { a: "Şehname", b: "Biyografi", c: "Muvafakatname ", d: "Tezkire" }, "d"),
  new Soru("8-) Cep telefonuyla iletişim olanağından uzak kalma korkusuna ne ad verilir?", { a: "Nomofobi", b: "Sosyofobi", c: "Kişilik bozukluğu ", d: "Agorafobi" }, "a"),
  new Soru("9-)  Timur ve Osmanlı İmparatorluklarında yaşamış olan astronom, matematikçi, fizikçi, filozof ve dil bilimci kimdir?", { a: "Ali kuşçu", b: "Ali Suavi", c: "Ali Şir Nevai", d: "Ali Münif  Yeğenağa" }, "a"),
  new Soru("10-) Türk ve Altay mitolojisinde Türklerin atasıdır.Annesi Ay Kağan, babası ise Kara Han'dır.Bahsedilen kişi kimdir?", { a: "Bumin Kağan", b: "Mukan Kağan", c: "İşbara  Kağan", d: "Oğuz Kağan" }, "d")
];

function Exam(sorular){
  this.sorular = sorular;
  this.soruSayisi = 0;
  this.dogruCevapSayisi = 0;
}


Exam.prototype.soruGetir = function(){
    return this.sorular[this.soruSayisi];
}

const exam = new Exam(sorular);
const nextButton = document.querySelector(".next_btn");
const backButton = document.querySelector(".back_btn");

btn_start = document.querySelector(".button");

btn_start.addEventListener("click" , function()
{
    exam.soruSayisi += 1;
    sorulariGetir(exam.soruGetir());
    document.querySelector(".text_box").classList.add("active");
    document.querySelector(".point-card").classList.add("active");

});

const answer_list = document.querySelector(".answers")

function sorulariGetir(soru) 
{
  let sinavSorusu = `<span>${soru.soruMetni}</span>`;
  let cevaplarListesi = ``;
  
    for(let cevap in soru.cevaplar) 
    {
      cevaplarListesi += 
        `
          <div class="answer">
              <span><b>${cevap}</b>: ${soru.cevaplar[cevap[0]]}</span>
         </div>
        `;
    }

    document.querySelector(".question_text").innerHTML = sinavSorusu;
    answer_list.innerHTML = cevaplarListesi;
    

    const secenekler = answer_list.querySelectorAll(".answer");

    for(let secim of secenekler){
      secim.setAttribute("onclick" , "secenekSecimi(this)")
    }
}

//doğru-yanlıs ayarlaması 

let puan = 0;
let dogru_sayisi = 0;
let yanlis_sayisi = 0;

function skoruYaz()
{
  document.getElementById("d_sayisi").innerHTML = dogru_sayisi;
  document.getElementById("y_sayisi").innerHTML = yanlis_sayisi;
  document.getElementById("p_toplam").innerHTML = puan;
}

//şıkları işaretleme ve style olayları.

function secenekSecimi(secenek)
{
  let cevap = secenek.querySelector("span b").textContent;
  let soru = exam.soruGetir();
  secilenSik = secenek.getAttribute("data-secim");

  if(soru.cevabiKontrolEt(cevap)){
      dogru_sayisi++;  
      puan = puan +10; 
      skoruYaz();
      secenek.classList.add("dogru")
  }
  else
  {
    yanlis_sayisi++;
    secenek.classList.add("yanlis");
    skoruYaz();
  }
  for(let i=0; i < answer_list.children.length; i++) {
    answer_list.children[i].classList.add("disabled");
  }

}

//ileri butonu

score_box =  document.querySelector(".score-box");

nextButton.addEventListener("click", function() 
{
  if(exam.sorular.length != exam.soruSayisi){
    exam.soruSayisi += 1;
    sorulariGetir(exam.soruGetir());
    document.querySelector(".text_box").classList.add("active");
     if(exam.sorular.length == sorular[0])
     {
       backButton.disabled = true;
     }
       nextButton.disabled = false;
  }
  else
  {
    console.log("sınav bitti.");
    score_box.classList.add("active")
    document.querySelector(".text_box").classList.remove("active");
    document.querySelector(".point-card").classList.remove("active");
    skoruGoster(exam.sorular.length, exam.dogruCevapSayisi);
  }
});

  //geri butonu

backButton.addEventListener("click", function() 
{
  if(exam.sorular.length != exam.soruSayisi){
    exam.soruSayisi -= 1;
    sorulariGetir(exam.soruGetir());
    document.querySelector(".text_box").classList.add("active");
  }
  else
  {
    console.log("sınav bitti.");
  }
});

//sonda açılan kartın olayı.

function skoruGoster(soruMetni, dogruCevap) 
{
  basariMetni = `
              Toplam ${Soru.sorular.length} sorudan ${Soru.dogruCevap} doğru cevap verdiniz.
              `;  
  document.querySelector(".score-box .score-body").innerHTML = basariMetni;           
}

function sinaviBitir()
{
  window.location.reload(); 
}

