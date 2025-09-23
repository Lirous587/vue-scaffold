# vue-scaffold 极简手脚架

> 本项目为自用极简 Vue3 + Vite + Pinia + TailwindCSS 后台管理系统脚手架 (当然也可以用于做无需SRR的C端系统等)
>
> 推荐使用 `pnpm gonew` 脚本一键重置，快速获得干净的起步环境。

---

## ✨ 特性

- 基于 [Vue 3](https://vuejs.org/)、[Vite](https://vitejs.dev/)、[Pinia](https://pinia.vuejs.org/)、[TailwindCSS](https://tailwindcss.com/)
- 已集成 TypeScript、ESLint、Prettier、Husky、lint-staged 等开发工具
- 支持一键重置，快速清理模板内容
- 目录结构清晰，方便二次开发
- 常用依赖预装：axios、nprogress、li-daisy、daisyui、md-editor-v3、cropperjs 等

---

## 📦 主要依赖

> 如果使用了 `pnpm gonew` 那将仅需保留以下核心依赖

- `vue` `vue-router` `pinia`
- `tailwindcss`
- `axios`

  > 但 `pnpm gonew` 脚本不会去做这一处理，因为其余依赖是值得尝试的
  >
  > 若执意需要一个完全干净的手脚架可以删除非必要依赖
  >
  > 注意 `li-daisy` 为作者自主开发的组件库，目的是完善 `daisyui` 中不足的功能，`若无使用兴趣`，请删除 `assets/css` 下的 `tailwind.css` 中的这两行
  >
  > ```css
  > @plugin "daisyui";
  > @import './daisyui.css';
  > ```
  >
  > 以及删除其下的 `daisyui.css` 这一文件

- **核心依赖**
  - `vue` `vue-router` `pinia`
  - `tailwindcss` `daisyui` `li-daisy`
  - `axios` `nprogress` `md-editor-v3` `cropperjs` `uuid` `universal-cookie` `yup`

---

## 📁 目录结构

```
src/
  ├─ api/
  ├─ assets/
  ├─ components/
  ├─ composable/
  ├─ layouts/
  ├─ pages/
  ├─ request/
  ├─ scripts/
  ├─ stores/
  ├─ utils/
  ├─ App.vue
  ├─ config.ts
  ├─ main.ts
  └─ routerGuards.ts (执行gonew脚本之后将被删除)
```

---

## 🚀 快速开始

1. **克隆项目**

   ```bash
   git clone https://github.com/Lirous587/vue-scaffold.git
   cd vue-scaffold
   ```

2. **安装依赖**

   ```bash
   pnpm i
   ```

3. **重置项目**

   > 若不希望有任何杂七杂八的内容，可以执行脚本 `pnpm gonew`  
   > 这将仅仅保留**项目基础结构**以及**基础 css 文件**

   ```bash
   pnpm gonew
   ```

4. **启动开发服务器**

   ```bash
   pnpm run dev
   ```

---

## 🧹 关于 `pnpm gonew`

- 执行 `pnpm gonew` 会自动清理 `src` 目录下除 `assets/`、`App.vue`、`main.ts` 外的所有内容，并重置 `App.vue` 为最基础模板。
- 适合用来快速获得一个干净的项目骨架，便于自定义开发。

---

## 💡 推荐用法

- 建议执行 `pnpm gonew`，清理模板内容，获得最干净的起步环境
- 按需添加自己的页面、组件和业务逻辑

---

## 📝 License

MIT
