<template>
  <div>
    Login
    <div v-if="getAuth">
      <h1>User Info</h1>
      <div>
        <div>authType : {{getUser.authType}}</div>
        <div>authId : {{getUser.authId}}</div>
        <div>authName : {{getUser.authName}}</div>
        <div>authEmail : {{getUser.authEmail}}</div>
        <div>accessToken : {{getUser.accessToken}}</div>
      </div>
      <div>
        <p><button @click="logout">logout</button></p>
      </div>
    </div>
    <div v-else>
      <!--Naver-->
      <p><a :href="loginUrl.naver"><img height="50" :src="loginImage.naver"/></a></p>
      <!--Facebook-->
      <p><a :href="loginUrl.facebook"><img height="50" :src="loginImage.facebook"/></a></p>
      <!--Kakao-->
      <p><a :href="loginUrl.kakao"><img height="50" :src="loginImage.kakao"/></a></p>
      <!--Google-->
      <p><a :href="loginUrl.google"><img height="50" :src="loginImage.google"/></a></p>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        loginUrl: {
          naver: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.VUE_APP_CLIENT_ID_NAVER}&redirect_uri=${process.env.VUE_APP_CALLBACK_URL_NAVER}&state=STATE`,
          facebook: `https://www.facebook.com/v4.0/dialog/oauth?client_id=${process.env.VUE_APP_CLIENT_ID_FACEBOOK}&redirect_uri=${process.env.VUE_APP_CALLBACK_URL_FACEBOOK}&state=STATE`,
          kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID_KAKAO}&redirect_uri=${process.env.VUE_APP_CALLBACK_URL_KAKAO}&response_type=code`,
          google: `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.VUE_APP_CLIENT_ID_GOOGLE}&redirect_uri=${process.env.VUE_APP_CALLBACK_URL_GOOGLE}&scope=https://www.googleapis.com/auth/youtube.readonly&response_type=code&accessType=offline&prompt=consent`
        },
        loginImage: {
          naver: 'http://static.nid.naver.com/oauth/small_g_in.PNG',
          facebook: require('@/assets/images/facebook_account_login_btn.png'),
          kakao: require('@/assets/images/kakao_account_login_btn_medium_narrow.png'),
          google: require('@/assets/images/btn_google_signin_light_normal_web.png')
        },
        msg: ''
      }
    },
    mounted() {
        console.log(this.$route.params);
        console.log(this.$route.query);
        if(this.$route.query.returnPath){
          this.setReturnPath(this.$route.query.returnPath);
        }
        if(this.$route.query.user){
          this.login();
        }
    },
    computed: {
      ...mapGetters([
        'getAuth',
        'getReturnPath',
        'getUser',
      ])
    },
    methods: {
      ...mapMutations({
        setReturnPath: 'setReturnPath'
      }),
      login() {
        this.$store.dispatch('login', {
          user : this.$route.query.user
        }).then(() => this.redirect())
                .catch(({message}) => this.msg = message);
      },
      redirect() {
        let returnPath = this.getReturnPath;
        if(returnPath !== null){
          this.setReturnPath(null);
          this.$router.push(returnPath);
        }
      },
      logout() {
        this.$store.dispatch('logout', {
          provider : this.getUser.authType,
          user : this.getUser.authId
        });
        this.$router.replace({ name: "Login", params: {}, query: {} });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
