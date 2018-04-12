import Api from '@/services/Api'

export default {
  fetchLeagueData () {
    return Api().get('leaguedata')
  }
}
