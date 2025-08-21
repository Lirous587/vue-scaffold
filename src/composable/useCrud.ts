import { reactive, ref, toRaw, type Reactive, type Ref } from 'vue'
import type { SuccessResponse, ErrorResponse } from '@/request/response'
import { toast, type DrawerRef, type FormRef } from 'li-daisy'

interface CrudOptions<
  FetchRes,
  Model extends object,
  Query extends object = any,
  CreateReq extends object = any,
  UpdateReq extends { id: number | string } = any,
> {
  fetch: (query?: Query) => Promise<SuccessResponse<FetchRes>>
  create?: (data: CreateReq) => Promise<SuccessResponse<Model>>
  update?: (id: number | string, data: UpdateReq) => Promise<SuccessResponse<Model>>
  remove?: (id: number | string) => Promise<SuccessResponse<any>>

  onFetchBefore?: (query: Query) => Query
  onFetchAfter?: (data: FetchRes) => void

  createFormInit: () => CreateReq
  createDrawerRef: Ref<DrawerRef | undefined>
  createFormRef: Ref<FormRef | undefined>

  updateFormInit: () => UpdateReq
  updateDrawerRef: Ref<DrawerRef | undefined>
  updateFormRef: Ref<FormRef | undefined>
}

export function useCrud<
  FetchRes,
  Model extends object,
  Query extends object = any,
  CreateReq extends object = any,
  UpdateReq extends { id: number | string } = any,
>(options: CrudOptions<FetchRes, Model, Query, CreateReq, UpdateReq>) {
  // 必须数据
  const loading = ref(false)
  const createForm = reactive<CreateReq>(options.createFormInit())
  const updateForm = reactive<UpdateReq>(options.updateFormInit())

  const query = reactive<Query>({} as Query)
  const error = ref<string | null>(null)

  // 常用数据 list pages
  const list = ref<Model[]>([])
  const pages = ref(1)

  // 辅助变量
  const updateId = ref<number | string>(0)

  const fetch = async () => {
    loading.value = true
    error.value = null
    try {
      let q = toRaw(query) as Query
      // onFetchBefore：请求前参数处理
      if (options.onFetchBefore) q = options.onFetchBefore(q)
      // fetchList：发起请求
      const res = await options.fetch(q)
      // onFetchAfter：请求后数据处理
      options.onFetchAfter?.(res.data)
    } catch (e: any) {
      error.value = (e as ErrorResponse)?.message || '请求失败'
      return null
    } finally {
      loading.value = false
    }
  }

  fetch()

  const resetCreateForm = () => {
    Object.assign(createForm, options.createFormInit())
  }

  const openDrawerForCreate = () => {
    resetCreateForm()
    options.createDrawerRef.value?.open()
  }

  const handleCreate = async () => {
    if (!options.create) return
    await options.create({ ...createForm } as CreateReq)
    await fetch()
    options.createDrawerRef.value?.close()
  }

  const handleSubmitForCreate = () => {
    options.createFormRef?.value
      ?.validate()
      .then(() => {
        handleCreate()
      })
      .catch(() => {
        toast.warning('参数错误')
      })
  }

  const openDrawerForUpdate = (row: UpdateReq) => {
    resetCreateForm()
    updateId.value = row.id
    // 设置updateForm
    Object.assign(updateForm, row)
    console.log(options.updateDrawerRef.value)
    options.updateDrawerRef.value?.open()
  }

  const handleUpdate = async () => {
    if (!options.update) return
    await options.update(updateId.value, { ...updateForm } as UpdateReq)
    await fetch()
    options.updateDrawerRef.value?.close()
  }

  const handleSubmitForUpdate = async () => {
    options.updateFormRef?.value
      ?.validate()
      .then(() => {
        console.log('update')
        handleUpdate()
      })
      .catch(() => {
        toast.warning('参数错误')
      })
  }

  const handleDelete = async (id: number | string) => {
    if (!options.remove) return
    await options.remove(id)
    toast.success('删除成功')
    await fetch()
  }

  return {
    loading,
    createForm,
    updateForm,
    query,

    list,
    pages,

    openDrawerForCreate,
    openDrawerForUpdate,

    fetch,
    handleCreate,
    handleUpdate,
    handleDelete,

    handleSubmitForCreate,
    handleSubmitForUpdate,

    resetCreateForm,
  }
}
