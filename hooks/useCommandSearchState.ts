import create from 'zustand'

interface CommandSearchState {
  open: boolean
  toggle: () => void
}

const useCommandSearchState = create<CommandSearchState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}))

export default useCommandSearchState
