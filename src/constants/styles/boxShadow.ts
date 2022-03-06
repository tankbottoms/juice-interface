export default function juiceBoxShadow(isDarkMode: boolean) {
  return `0px 8px 12px ${isDarkMode ? '#000000' : 'rgba(0, 0, 0, 0.1)'}`
}
