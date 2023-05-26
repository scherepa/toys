window.onload = () => {
  init();
}

const init = () => {
  doApi()
}

const doApi = async() => {
  let url = "https://toys-nodejs-sv.cyclic.app/toys"
  try{
  let resp = await fetch(url, {method: "GET", headers: {"Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"}});
  let data = await resp.json();
  console.log(data);
  createToy(data);
  }
  catch(err){
    console.log(err);
  }
}

const createToy = (_ar) => {
  _ar.map(item => {
    let nToy = new NewToy("#id_row",item);
    nToy.render();
  })
}
