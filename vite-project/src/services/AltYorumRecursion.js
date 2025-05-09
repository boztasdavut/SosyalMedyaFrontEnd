export const recursiveAltYorumGetir = (altYorumObjesi) => {
  let allComments = [];

  function collectComments(altYorumObjesi) {
    allComments.push({
      yorumId: currentComment.yorumId,
      yeniYorumIcerigi: currentComment.yeniYorumIcerigi,
      yeniYorumOlusturulmaTarihi: currentComment.yeniYorumOlusturulmaTarihi,
      yeniYorumBegeniSayisi: currentComment.yeniYorumBegeniSayisi,
      yorumuBegendimMi: currentComment.yorumuBegendimMi || false,
      yorumYapanTakmaAd: currentComment.yorumYapanTakmaAd || "",
      yorumYapanResim: currentComment.yorumYapanResim || "",
    });

    altYorumObjesi.altYorumlar.forEach((altYorum) => collectComments(altYorum));
  }

  collectComments(comment);

  return allComments;
};
