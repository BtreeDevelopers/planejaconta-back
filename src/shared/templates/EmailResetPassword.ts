export default (name: string, token: string) =>
  `<h3>Olá ${name}, <br><br>    Clique <a href='https://planejaconta.web.app/password/${token}'>aqui</a> para iniciar a recuperação de sua senha!</h3><h5> Caso o link acima não funcionar, copie a URL (https://planejaconta.web.app/password/${token}) e cole no navegador.</h5>`;
