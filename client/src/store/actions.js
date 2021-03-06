import axios from 'axios'
/**
 * 비 순차적 또는 비동기 처리 로직들을 선언
 * setTimeout()이나 서버와의 http 통신 처리 같이 결과를 받아올 타이밍이 예측되지 않는 로직
 *
 */
export const actions = {
    /**
     * 예제
     * asyncIncrement: function (context, payload) {
          return setTimeout(function () {
            context.commit('increment', payload.by);
          }, payload.duration);
        },

     * getServerData: function (context) {
          return axios.get("sample.json").then(function() {
            // ...
          });
        },
     */
    login({commit}, {user}) {
        return axios.get(`${process.env.VUE_APP_AUTH_HOST}/login?user=${user}`)
            .then(({data}) => {
                commit('setAuth', true);
                commit('login', data.data);
            })
            .catch(({message}) => { console.log(message)});
    },
    logout ({commit}) {
        return commit('setAuth', false);
    }

};
