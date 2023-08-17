import { StyleSheet } from 'react-native'

export const ds = {
  elevation: 3,
  sizes: {
    xs: 5,
    s: 10,
    m: 15,
    l: 20,
    hoverButton: 60,
  },
  entries: {
    height: 40,
  },
  font: {
    sizes: {
      huge: 32,
      major: 24,
      minor: 18,
    },
  },
  colors: {
    primary: '#468B97',
    secondary: '#1D5B79',
    highlight1: '#EF6262',
    highlight2: '#F3AA60',
  },
  icons: {
    medium: 24,
    large: 32,
  },
  textInput: {
    numberOfLines: 4,
  },
  border: {
    radius: 5,
  },
}

const styles = StyleSheet.create({
  bluePanel: {
    backgroundColor: ds.colors.secondary,
    marginHorizontal: ds.sizes.s,
    paddingVertical: ds.sizes.s,
    paddingHorizontal: ds.sizes.s,
    borderRadius: ds.border.radius,
  },
  orangePanel: {
    backgroundColor: ds.colors.highlight1,
    marginHorizontal: ds.sizes.s,
    marginTop: ds.sizes.m,
    paddingVertical: ds.sizes.s,
    paddingHorizontal: ds.sizes.s,
    borderRadius: ds.border.radius,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
})

export { styles }
