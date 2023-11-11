async function download(arquivo) {
    try {
      const downloadUrl = 'http://localhost:3000/download/?file=' + arquivo;
      const newWindow = window.open(downloadUrl, '_blank');
      if (!newWindow) {
        throw new Error('Habilite os Pop Ups no seu navegador.');
      }
    } catch (error) {
      console.log(error);
    }
}  
module.exports = { download };
  