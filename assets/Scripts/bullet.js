// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var BulletType=cc.Enum({
    PlayerBullet:0,
    EnemyBullet:1,
});
cc.Class({
    extends: cc.Component,

    properties: {
        speedNow:800,
        initSpeed:800,
        destroyHeight:800,
        pool: null,
        hasInit:false,
        bulletType:{
            default:BulletType.PlayerBullet,
            type:cc.Enum(BulletType)
        }
    },

    reuse (pool) {
        this.pool = pool;
    },

    // onCollisionEnter (other, self) {
    //     if(other.tag==2)//敌人
    //       this.pool.put(this.node);
    // },
    
    onBeginContact: function (contact, self, other) {
        if(other.tag==2)//敌人
        {
            this.hasInit=false;
            this.pool.put(this.node);
        }

        
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //start () {
    InitBullet(_bulletType,pool)
    {
        this.reuse(pool);
        this.bulletType=_bulletType;
        if(this.bulletType==BulletType.PlayerBullet)
        {
            this.speedNow=this.initSpeed;
            this.destroyHeight=800;
            this.node.rotation=0;
        }else if(this.bulletType==BulletType.EnemyBullet)
        {
            this.speedNow=this.initSpeed*(-1);
            this.destroyHeight=-790;
            this.node.rotation=-180;
        }
        this.hasInit=true;
    },

    update (dt) {
        if(!this.hasInit)return;
        this.node.y += this.speedNow * dt;
        if(this.bulletType==BulletType.PlayerBullet)
        {
            if (this.node.y > this.destroyHeight) {
                this.hasInit=false;
                this.pool.put(this.node);
            }
        }else if(this.bulletType==BulletType.EnemyBullet)
        {
            if (this.node.y <this.destroyHeight) {
                this.hasInit=false;
                this.pool.put(this.node);
            }
        }
    },
});
