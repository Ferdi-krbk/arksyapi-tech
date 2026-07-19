/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated + manually maintained route tree

import { Route as rootRouteImport } from './routes/__root'
import { Route as ZeminKaplamaRouteImport } from './routes/zemin-kaplama'
import { Route as YesilCatiZeminleriRouteImport } from './routes/yesil-cati-zeminleri'
import { Route as SurmeIzolasyonRouteImport } from './routes/surme-izolasyon'
import { Route as ReferanslarRouteImport } from './routes/referanslar'
import { Route as PolyureaRouteImport } from './routes/polyurea'
import { Route as PoliuretanRouteImport } from './routes/poliuretan'
import { Route as IletisimRouteImport } from './routes/iletisim'
import { Route as GaleriRouteImport } from './routes/galeri'
import { Route as ProjelerRouteImport } from './routes/projeler'
import { Route as HaberlerRouteImport } from './routes/haberler'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ProjelerIndexRouteImport } from './routes/projeler.index'
import { Route as HaberlerIndexRouteImport } from './routes/haberler.index'
import { Route as ProjelerSlugRouteImport } from './routes/projeler.$slug'
import { Route as HaberlerSlugRouteImport } from './routes/haberler.$slug'
import { Route as SayfaSlugRouteImport } from './routes/sayfa.$slug'

const ZeminKaplamaRoute = ZeminKaplamaRouteImport.update({ id: '/zemin-kaplama', path: '/zemin-kaplama', getParentRoute: () => rootRouteImport } as any)
const YesilCatiZeminleriRoute = YesilCatiZeminleriRouteImport.update({ id: '/yesil-cati-zeminleri', path: '/yesil-cati-zeminleri', getParentRoute: () => rootRouteImport } as any)
const SurmeIzolasyonRoute = SurmeIzolasyonRouteImport.update({ id: '/surme-izolasyon', path: '/surme-izolasyon', getParentRoute: () => rootRouteImport } as any)
const ReferanslarRoute = ReferanslarRouteImport.update({ id: '/referanslar', path: '/referanslar', getParentRoute: () => rootRouteImport } as any)
const PolyureaRoute = PolyureaRouteImport.update({ id: '/polyurea', path: '/polyurea', getParentRoute: () => rootRouteImport } as any)
const PoliuretanRoute = PoliuretanRouteImport.update({ id: '/poliuretan', path: '/poliuretan', getParentRoute: () => rootRouteImport } as any)
const IletisimRoute = IletisimRouteImport.update({ id: '/iletisim', path: '/iletisim', getParentRoute: () => rootRouteImport } as any)
const GaleriRoute = GaleriRouteImport.update({ id: '/galeri', path: '/galeri', getParentRoute: () => rootRouteImport } as any)
const ProjelerRoute = ProjelerRouteImport.update({ id: '/projeler', path: '/projeler', getParentRoute: () => rootRouteImport } as any)
const HaberlerRoute = HaberlerRouteImport.update({ id: '/haberler', path: '/haberler', getParentRoute: () => rootRouteImport } as any)
const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const ProjelerIndexRoute = ProjelerIndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => ProjelerRoute } as any)
const HaberlerIndexRoute = HaberlerIndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => HaberlerRoute } as any)
const ProjelerSlugRoute = ProjelerSlugRouteImport.update({ id: '/$slug', path: '/$slug', getParentRoute: () => ProjelerRoute } as any)
const HaberlerSlugRoute = HaberlerSlugRouteImport.update({ id: '/$slug', path: '/$slug', getParentRoute: () => HaberlerRoute } as any)
const SayfaSlugRoute = SayfaSlugRouteImport.update({ id: '/sayfa/$slug', path: '/sayfa/$slug', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/galeri': typeof GaleriRoute
  '/iletisim': typeof IletisimRoute
  '/poliuretan': typeof PoliuretanRoute
  '/polyurea': typeof PolyureaRoute
  '/referanslar': typeof ReferanslarRoute
  '/surme-izolasyon': typeof SurmeIzolasyonRoute
  '/yesil-cati-zeminleri': typeof YesilCatiZeminleriRoute
  '/zemin-kaplama': typeof ZeminKaplamaRoute
  '/projeler': typeof ProjelerIndexRoute
  '/haberler': typeof HaberlerIndexRoute
  '/projeler/$slug': typeof ProjelerSlugRoute
  '/haberler/$slug': typeof HaberlerSlugRoute
  '/sayfa/$slug': typeof SayfaSlugRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/galeri': typeof GaleriRoute
  '/iletisim': typeof IletisimRoute
  '/poliuretan': typeof PoliuretanRoute
  '/polyurea': typeof PolyureaRoute
  '/referanslar': typeof ReferanslarRoute
  '/surme-izolasyon': typeof SurmeIzolasyonRoute
  '/yesil-cati-zeminleri': typeof YesilCatiZeminleriRoute
  '/zemin-kaplama': typeof ZeminKaplamaRoute
  '/projeler': typeof ProjelerIndexRoute
  '/haberler': typeof HaberlerIndexRoute
  '/projeler/$slug': typeof ProjelerSlugRoute
  '/haberler/$slug': typeof HaberlerSlugRoute
  '/sayfa/$slug': typeof SayfaSlugRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/galeri': typeof GaleriRoute
  '/iletisim': typeof IletisimRoute
  '/poliuretan': typeof PoliuretanRoute
  '/polyurea': typeof PolyureaRoute
  '/referanslar': typeof ReferanslarRoute
  '/surme-izolasyon': typeof SurmeIzolasyonRoute
  '/yesil-cati-zeminleri': typeof YesilCatiZeminleriRoute
  '/zemin-kaplama': typeof ZeminKaplamaRoute
  '/projeler': typeof ProjelerRouteWithChildren
  '/haberler': typeof HaberlerRouteWithChildren
  '/projeler/': typeof ProjelerIndexRoute
  '/haberler/': typeof HaberlerIndexRoute
  '/projeler/$slug': typeof ProjelerSlugRoute
  '/haberler/$slug': typeof HaberlerSlugRoute
  '/sayfa/$slug': typeof SayfaSlugRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/' | '/galeri' | '/iletisim' | '/poliuretan' | '/polyurea'
    | '/referanslar' | '/surme-izolasyon' | '/yesil-cati-zeminleri' | '/zemin-kaplama'
    | '/projeler' | '/haberler' | '/projeler/$slug' | '/haberler/$slug' | '/sayfa/$slug'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/' | '/galeri' | '/iletisim' | '/poliuretan' | '/polyurea'
    | '/referanslar' | '/surme-izolasyon' | '/yesil-cati-zeminleri' | '/zemin-kaplama'
    | '/projeler' | '/haberler' | '/projeler/$slug' | '/haberler/$slug' | '/sayfa/$slug'
  id:
    | '__root__' | '/' | '/galeri' | '/iletisim' | '/poliuretan' | '/polyurea'
    | '/referanslar' | '/surme-izolasyon' | '/yesil-cati-zeminleri' | '/zemin-kaplama'
    | '/projeler' | '/haberler' | '/projeler/' | '/haberler/' | '/projeler/$slug' | '/haberler/$slug' | '/sayfa/$slug'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  GaleriRoute: typeof GaleriRoute
  IletisimRoute: typeof IletisimRoute
  PoliuretanRoute: typeof PoliuretanRoute
  PolyureaRoute: typeof PolyureaRoute
  ReferanslarRoute: typeof ReferanslarRoute
  SurmeIzolasyonRoute: typeof SurmeIzolasyonRoute
  YesilCatiZeminleriRoute: typeof YesilCatiZeminleriRoute
  ZeminKaplamaRoute: typeof ZeminKaplamaRoute
  ProjelerRoute: typeof ProjelerRouteWithChildren
  HaberlerRoute: typeof HaberlerRouteWithChildren
  SayfaSlugRoute: typeof SayfaSlugRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/zemin-kaplama': { id: '/zemin-kaplama'; path: '/zemin-kaplama'; fullPath: '/zemin-kaplama'; preLoaderRoute: typeof ZeminKaplamaRouteImport; parentRoute: typeof rootRouteImport }
    '/yesil-cati-zeminleri': { id: '/yesil-cati-zeminleri'; path: '/yesil-cati-zeminleri'; fullPath: '/yesil-cati-zeminleri'; preLoaderRoute: typeof YesilCatiZeminleriRouteImport; parentRoute: typeof rootRouteImport }
    '/surme-izolasyon': { id: '/surme-izolasyon'; path: '/surme-izolasyon'; fullPath: '/surme-izolasyon'; preLoaderRoute: typeof SurmeIzolasyonRouteImport; parentRoute: typeof rootRouteImport }
    '/referanslar': { id: '/referanslar'; path: '/referanslar'; fullPath: '/referanslar'; preLoaderRoute: typeof ReferanslarRouteImport; parentRoute: typeof rootRouteImport }
    '/polyurea': { id: '/polyurea'; path: '/polyurea'; fullPath: '/polyurea'; preLoaderRoute: typeof PolyureaRouteImport; parentRoute: typeof rootRouteImport }
    '/poliuretan': { id: '/poliuretan'; path: '/poliuretan'; fullPath: '/poliuretan'; preLoaderRoute: typeof PoliuretanRouteImport; parentRoute: typeof rootRouteImport }
    '/iletisim': { id: '/iletisim'; path: '/iletisim'; fullPath: '/iletisim'; preLoaderRoute: typeof IletisimRouteImport; parentRoute: typeof rootRouteImport }
    '/galeri': { id: '/galeri'; path: '/galeri'; fullPath: '/galeri'; preLoaderRoute: typeof GaleriRouteImport; parentRoute: typeof rootRouteImport }
    '/projeler': { id: '/projeler'; path: '/projeler'; fullPath: '/projeler'; preLoaderRoute: typeof ProjelerRouteImport; parentRoute: typeof rootRouteImport }
    '/haberler': { id: '/haberler'; path: '/haberler'; fullPath: '/haberler'; preLoaderRoute: typeof HaberlerRouteImport; parentRoute: typeof rootRouteImport }
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
    '/projeler/': { id: '/projeler/'; path: '/'; fullPath: '/projeler/'; preLoaderRoute: typeof ProjelerIndexRouteImport; parentRoute: typeof ProjelerRoute }
    '/haberler/': { id: '/haberler/'; path: '/'; fullPath: '/haberler/'; preLoaderRoute: typeof HaberlerIndexRouteImport; parentRoute: typeof HaberlerRoute }
    '/projeler/$slug': { id: '/projeler/$slug'; path: '/$slug'; fullPath: '/projeler/$slug'; preLoaderRoute: typeof ProjelerSlugRouteImport; parentRoute: typeof ProjelerRoute }
    '/haberler/$slug': { id: '/haberler/$slug'; path: '/$slug'; fullPath: '/haberler/$slug'; preLoaderRoute: typeof HaberlerSlugRouteImport; parentRoute: typeof HaberlerRoute }
    '/sayfa/$slug': { id: '/sayfa/$slug'; path: '/sayfa/$slug'; fullPath: '/sayfa/$slug'; preLoaderRoute: typeof SayfaSlugRouteImport; parentRoute: typeof rootRouteImport }
  }
}

interface ProjelerRouteChildren {
  ProjelerIndexRoute: typeof ProjelerIndexRoute
  ProjelerSlugRoute: typeof ProjelerSlugRoute
}
const ProjelerRouteChildren: ProjelerRouteChildren = {
  ProjelerIndexRoute: ProjelerIndexRoute,
  ProjelerSlugRoute: ProjelerSlugRoute,
}
const ProjelerRouteWithChildren = ProjelerRoute._addFileChildren(ProjelerRouteChildren)

interface HaberlerRouteChildren {
  HaberlerIndexRoute: typeof HaberlerIndexRoute
  HaberlerSlugRoute: typeof HaberlerSlugRoute
}
const HaberlerRouteChildren: HaberlerRouteChildren = {
  HaberlerIndexRoute: HaberlerIndexRoute,
  HaberlerSlugRoute: HaberlerSlugRoute,
}
const HaberlerRouteWithChildren = HaberlerRoute._addFileChildren(HaberlerRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  GaleriRoute: GaleriRoute,
  IletisimRoute: IletisimRoute,
  PoliuretanRoute: PoliuretanRoute,
  PolyureaRoute: PolyureaRoute,
  ReferanslarRoute: ReferanslarRoute,
  SurmeIzolasyonRoute: SurmeIzolasyonRoute,
  YesilCatiZeminleriRoute: YesilCatiZeminleriRoute,
  ZeminKaplamaRoute: ZeminKaplamaRoute,
  ProjelerRoute: ProjelerRouteWithChildren,
  HaberlerRoute: HaberlerRouteWithChildren,
  SayfaSlugRoute: SayfaSlugRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
    config: Awaited<ReturnType<typeof startInstance.getOptions>>
  }
}
