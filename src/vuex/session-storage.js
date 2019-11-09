import storage from 'good-storage'

const TokenKey = '__User-Token__'
const user = '__User-info__'
const remember = '__Remember__'
const islogin = '__User-islogin'

export function getToken() {
  return storage.session.get(TokenKey)
}
export function setToken(token) {
  return storage.session.set(TokenKey, token)
}
export function removeToken() {
  return storage.session.remove(TokenKey)
}
export function getUserinfo() {
  return storage.session.get(user)
}
export function setUserinfo(arg) {
  return storage.session.set(user, arg)
}
export function removeUserinfo() {
  return storage.session.remove(user)
}
export function getIslogin () {
  return storage.session.get(islogin)
}
export function setIslogin (arg) {
  return storage.session.set(islogin, arg)
}
export function removeIslogin () {
  return storage.session.remove(islogin)
}
export function getRemember() {
  return storage.get(remember)
}
export function setRemember(arg) {
  return storage.set(remember, arg)
}
export function removeRemember() {
  return storage.remove(remember)
}
