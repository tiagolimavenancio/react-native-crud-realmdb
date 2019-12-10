import Hero from '~/models/Hero'
import Message from '~/models/Message'
import Realm from 'realm'

const realm = new Realm({ path: 'hero-db.realm', schema: [Hero.schema] })

const checkIfHeroExists = (id) => {
  let hero = getHeroById(id).result
  return hero != null
}

export const generateId = () => {
  let heroes = getAllHeroes().result;
  if(heroes.length == 0)
    return 1;

  let sortedHeroes = heroes.sorted('heroId', true)
  let firstHero = sortedHeroes[0]
  return firstHero['heroId'] + 1;
}

export const createHero = (hero) => {
  let msg = new Message()

  if(!hero) {
    msg.result = false
    msg.message = 'Invalid hero input'
    return msg
  }

  hero.heroId = generateId()

  if(checkIfHeroExists(hero.heroId)) {
    msg.result = false;
    msg.message = `Hero with id=${hero.heroId} exists!`
    return msg
  }

  try {
    realm.write(() => {
      realm.create('Hero', hero.getRealmObject())
    })
    msg.result = true
    msg.message = 'Create new hero successfully!'
  } catch (err) {
    msg.result = false;
    msg.message = `${err.message}`
  } finally {
    return msg
  }
}

export const getAllHeroes = () => {
  let msg = new Message()

  try {
    msg.result = realm.objects('Hero')
    msg.message = 'Get all heroes successfully!'
  } catch(err) {
    msg.result = []
    msg.message = 'Get all heroes failed!'
  } finally {
    return msg
  }
}

export const getHeroById = (id) => {
  let msg = new Message()

  let heroes = getAllHeroes().result
  let findHero = heroes.filtered(`heroId=${id}`)

  if(findHero.length == 0) {
    msg.result = null
    msg.message = `Not found hero with id=${id}`
  } else {
    msg.result = findHero[0]
    msg.message = `Found 1 hero with id=${id}`
  }

  return msg;
}

export const updateHero = (hero) => {
  let msg = new Message()
  if(!hero) {
    msg.result = false;
    msg.message = 'Invalid hero input!'
    return msg
  }

  let findHero = getHeroById(hero.heroId).result
  if(!findHero) {
    msg.result = false
    msg.message = `Not found hero with id=${id}`
    return msg
  }

  try {
    realm.write(() => {
      hero.updateObjectInfo(findHero)
    })
    msg.result = true
    msg.message = `Update hero with id=${hero.heroId} successfully!`
  } catch (err) {
    msg.result = false
    msg.message = `Update hero with id=${hero.heroId} failed: ${err.message}`
  } finally {
    return msg
  }
}

export const deleteHero = (hero) => {
  let msg = new Message()
  if(!hero) {
    msg.result = false
    msg.message = 'Invalid hero input!'
    return msg
  }

  let findHero = getHeroById(hero.heroId).result
  if(!findHero) {
    msg.result = false
    msg.message = `Not found hero with id=${hero.heroId}`;
    return msg;
  }

  try {
    realm.write(() => {
      realm.delete(findHero)
    })
    msg.result = true
    msg.message = `Delete hero with id=${hero.heroId} successfully!`
  } catch (err) {
    msg.result = false
    msg.message = `Delete hero with id=${hero.heroId} failed: ${e.message}`;
  } finally {
    return msg
  }
}
