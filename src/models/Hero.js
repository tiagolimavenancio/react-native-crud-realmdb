const HeroSchema = {
  name: 'Hero',
  properties: {
    heroId: 'int',
    heroName: 'string'
  }
}

export default class Hero {
  heroId = null;
  heroName = '';

  constructor(heroId = 1, heroName = '') {
    this.heroId = heroId;
    this.heroName = heroName;
  }

  getRealmObject() {
    return {
      heroId: this.heroId,
      heroName: this.heroName
    }
  }

  updateObjectInfo(hero) {
    if(!hero)
      return;

    hero['heroName'] = this.heroName
  }

  clone() {
    return new Hero(this.heroId, this.heroName)
  }
}

Hero.schema = HeroSchema
