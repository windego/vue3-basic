declare module '*.png' {
  const content: string
  export default content
}
declare module '*.svg' {
  const content: string
  export default content
}
declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '@assets/styles/antd.global' {
  const theme: { readonly [key: string]: string }
  export default theme
}
