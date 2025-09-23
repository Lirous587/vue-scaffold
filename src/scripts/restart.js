/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 重置脚本 - 清理 src 目录但保留基础结构
 * 保留: assets目录、App.vue、main.ts
 * 删除: src下其他所有文件和目录
 */
function restart() {
  const srcDir = path.resolve(__dirname, '../')

  // 需要保留的文件和目录
  const keepItems = new Set(['assets', 'App.vue', 'main.ts', 'scripts'])

  try {
    console.log('🚀 开始执行重置脚本...')

    // 读取 src 目录内容
    const items = fs.readdirSync(srcDir)

    let deletedCount = 0

    for (const item of items) {
      // 跳过需要保留的项目
      if (keepItems.has(item)) {
        console.log(`✅ 保留: ${item}`)
        continue
      }

      const itemPath = path.join(srcDir, item)
      const stats = fs.statSync(itemPath)

      if (stats.isDirectory()) {
        // 删除目录
        fs.rmSync(itemPath, { recursive: true, force: true })
        console.log(`🗑️  删除目录: ${item}`)
      } else {
        // 删除文件
        fs.unlinkSync(itemPath)
        console.log(`🗑️  删除文件: ${item}`)
      }

      deletedCount++
    }

    // 创建 .gitkeep 文件
    const gitkeepPath = path.join(srcDir, '.gitkeep')
    fs.writeFileSync(gitkeepPath, '')
    console.log('📝 创建 .gitkeep 文件')

    console.log(`\n✨ 重置完成！`)
    console.log(`📊 删除了 ${deletedCount} 个项目`)
    console.log(`📁 保留的项目: ${Array.from(keepItems).join(', ')}`)
    console.log('\n🎯 接下来执行以下命令开始开发:')
    console.log('   pnpm i')
    console.log('   pnpm run dev')
  } catch (error) {
    console.error('❌ 重置失败:', error)
    process.exit(1)
  }
}

// 执行重置
restart()
