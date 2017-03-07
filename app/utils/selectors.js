import { between, testCollide } from 'utils/common'
import { BLOCK_SIZE, FIELD_BLOCK_SIZE, ITEM_SIZE_MAP } from 'utils/constants'

export const time = state => state.get('time')

export const player = state => state.get('player')

export const bullets = state => state.get('bullets')

export const canFire = (state, targetOwner) => {
  if (targetOwner === 'player') {
    if (!player(state).get('active')) {
      return false
    }
  }
  return !bullets(state).has(targetOwner)
}

export const map = state => state.get('map')
map.bricks = state => map(state).get('bricks')
map.steels = state => map(state).get('steels')

export const canMove = (state, movedPlayer, threshhold = -0.01) => {
  const { x, y } = movedPlayer.toObject()
  if (!between(0, x, BLOCK_SIZE * (FIELD_BLOCK_SIZE - 1))
    || !between(0, y, BLOCK_SIZE * (FIELD_BLOCK_SIZE - 1))) {
    return false
  }

  const { bricks, steels, rivers } = map(state).toObject()
  const target = {
    x,
    y,
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  }
  if (testCollide(target, ITEM_SIZE_MAP.BRICK, bricks, threshhold)) {
    return false
  }
  if (testCollide(target, ITEM_SIZE_MAP.STEEL, steels, threshhold)) {
    return false
  }
  if (testCollide(target, ITEM_SIZE_MAP.RIVER, rivers, threshhold)) {
    return false
  }

  return true
}

export const explosions = state => state.get('explosions')

export const flickers = state => state.get('flickers')