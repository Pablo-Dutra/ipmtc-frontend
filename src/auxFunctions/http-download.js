async function download(arquivo) {
    try {
      const downloadUrl = process.env.VUE_APP_ROOT_API + '/download/?file=' + arquivo;
      const newWindow = window.open(downloadUrl, '_blank');
      if (!newWindow) {
        throw new Error('Habilite os Pop Ups no seu navegador.');
      }
    } catch (error) {
      console.log(error);
    }
}  
module.exports = { download };
  