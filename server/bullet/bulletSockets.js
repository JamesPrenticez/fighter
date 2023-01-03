// ---------- Bullet ---------- 

Bullet.list = {}

Bullet.update = () => {
  let pack = [];
  for(let i in Bullet.list){
      let bullet = Bullet.list[i]
      //console.log(Bullet.list[i])
      bullet.update()
      if(bullet.remove === true) delete Bullet.list[i]
      pack.push({
          x: bullet.x,
          y: bullet.y,
          color: bullet.color
      })
  }
  return pack;
}