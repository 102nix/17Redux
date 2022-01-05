import httpService from "./http.services"

const todosEndpoint = 'todos/'

const todosServices = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _page: 1, 
        _limit: 10
      }
    })
    return data
  },
  create: async (val) => {
    const { data } = await httpService.post(todosEndpoint, {
      title: val.title,
      completed: val.completed
    })
    return data
  }
}
export default todosServices