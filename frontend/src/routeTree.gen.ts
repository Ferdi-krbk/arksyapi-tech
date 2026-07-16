/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated + manually extended for new routes

import { Route as rootRouteImport } from './routes/__root'
import { Route as ZeminKaplamaRouteImport } from './routes/zemin-kaplama'
import { Route as YesilCatiZeminleriRouteImport } from './routes/yesil-cati-zeminleri'
import { Route as SurmeIzolasyonRouteImport } from './routes/surme-izolasyon'
import { Route as ReferanslarRouteImport } from './routes/referanslar'
import { Route as ProjelerRouteImport } from './routes/projeler'
import { Route as PolyureaRouteImport } from './routes/polyurea'
import { Route as PoliuretanRouteImport } from './routes/poliuretan'
import { Route as IletisimRouteImport } from './routes/iletisim'
import { Route as IndexRouteImport } from './routes/index'
import { Route as HaberlerRouteImport } from './routes/haberler'
import { Route as HaberlerSlugRouteImport } from './routes/haberler.$slug'
import { Route as GaleriRouteImport } from './routes/galeri'
import { Route as SayfaSlugRouteImport } from './routes/sayfa.$slug'

const ZeminKaplamaRoute = ZeminKaplamaRouteImport.update({ id: '/zemin-kaplama', path: '/zemin-kaplama', getParentRoute: () => rootRouteImport, } as any)
const YesilCatiZeminleriRoute = YesilCatiZeminleriRouteImport.update({ id: '/yesil-cati-zeminleri', path: '/yesil-cati-zeminleri', getParentRoute: () => rootRouteImport, } as any)
const SurmeIzolasyonRoute = SurmeIzolasyonRouteImport.update({ id: '/surme-izolasyon', path: '/surme-izolasyon', getParentRoute: () => rootRouteImport, } as any)
const ReferanslarRoute = ReferanslarRouteImport.update({ id: '/referanslar', path: '/referanslar', getParentRoute: () => rootRouteImport, } as any)
const ProjelerRoute = ProjelerRouteImport.update({ id: '/projeler', path: '/projeler', getParentRoute: () => rootRouteImport, } as any)
const PolyureaRoute = PolyureaRouteImport.update({ id: '/polyurea', path: '/polyurea', getParentRoute: () => rootRouteImport, } as any)
const PoliuretanRoute = PoliuretanRouteImport.update({ id: '/poliuretan', path: '/poliuretan', getParentRoute: () => rootRouteImport, } as any)
const IletisimRoute = IletisimRouteImport.update({ id: '/iletisim', path: '/iletisim', getParentRoute: () => rootRouteImport, } as any)
const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport, } as any)
const HaberlerRoute = HaberlerRouteImport.update({ id: '/haberler', path: '/haberler', getParentRoute: () => rootRouteImport, } as any)
const HaberlerSlugRoute = HaberlerSlugRouteImport.update({ id: '/haberler/$slug', path: '/haberler/$slug', getParentRoute: () => HaberlerRoute, } as any)
const GaleriRoute = GaleriRouteImport.update({ id: '/galeri', path: '/galeri', getParentRoute: () => rootRouteImport, } as any)
const SayfaSlugRoute = SayfaSlugRouteImport.update({ id: '/sayfa/$slug', path: '/sayfa/$slug', getParentRoute: () => rootRouteImport, } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/galeri': typeof GaleriRoute
  '/haberler': typeof HaberlerRoute
  '/haberler/$slug': typeof HaberlerSlugRoute
  '/iletisim': typeof IletisimRoute
  '/poliuretan': typeof PoliuretanRoute
  '/polyurea': typeof PolyureaRoute
  '/projeler': typeof ProjelerRoute
  '/referanslar': typeof ReferanslarRoute
  '/sayfa/$slug': typeof SayfaSlugRoute
  '/surme-izolasyon': typeof SurmeIzolasyonRoute
  '/yesil-cati-zeminleri': typeof YesilCatiZeminleriRoute
  '/zemin-kaplama': typeof ZeminKaplamaRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/galeri': typeof GaleriRoute
  '/haberler': typeof HaberlerRoute
  '/haberler/$slug': typeof HaberlerSlugRoute
  '/iletisim': typeof IletisimRoute
  '/poliuretan': typeof PoliuretanRoute
  '/polyurea': typeof PolyureaRoute
  '/projeler': typeof ProjelerRoute
  '/referanslar': typeof ReferanslarRoute
  '/sayfa/$slug': typeof SayfaSlugRoute
  '/surme-izolasyon': typeof SurmeIzolasyonRoute
  '/yesil-cati-zeminleri': typeof YesilCatiZeminleriRoute
  '/zemin-kaplama': typeof ZeminKaplamaRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/galeri': typeof GaleriRoute
  '/haberler': typeof HaberlerRoute
  '/haberler/$slug': typeof HaberlerSlugRoute
  '/iletisim': typeof IletisimRoute
  '/poliuretan': typeof PoliuretanRoute
  '/polyurea': typeof PolyureaRoute
  '/projeler': typeof ProjelerRoute
  '/referanslar': typeof ReferanslarRoute
  '/sayfa/$slug': typeof SayfaSlugRoute
  '/surme-izolasyon': typeof SurmeIzolasyonRoute
  '/yesil-cati-zeminleri': typeof YesilCatiZeminleriRoute
  '/zemin-kaplama': typeof ZeminKaplamaRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/galeri' | '/haberler' | '/haberler/$slug' | '/iletisim' | '/poliuretan' | '/polyurea' | '/projeler' | '/referanslar' | '/sayfa/$slug' | '/surme-izolasyon' | '/yesil-cati-zeminleri' | '/zemin-kaplama'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/galeri' | '/haberler' | '/haberler/$slug' | '/iletisim' | '/poliuretan' | '/polyurea' | '/projeler' | '/referanslar' | '/sayfa/$slug' | '/surme-izolasyon' | '/yesil-cati-zeminleri' | '/zemin-kaplama'
  id: '__root__' | '/' | '/galeri' | '/haberler' | '/haberler/$slug' | '/iletisim' | '/poliuretan' | '/polyurea' | '/projeler' | '/referanslar' | '/sayfa/$slug' | '/surme-izolasyon' | '/yesil-cati-zeminleri' | '/zemin-kaplama'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  GaleriRoute: typeof GaleriRoute
  HaberlerRoute: typeof HaberlerRoute
  IletisimRoute: typeof IletisimRoute
  PoliuretanRoute: typeof PoliuretanRoute
  PolyureaRoute: typeof PolyureaRoute
  ProjelerRoute: typeof ProjelerRoute
  ReferanslarRoute: typeof ReferanslarRoute
  SayfaSlugRoute: typeof SayfaSlugRoute
  SurmeIzolasyonRoute: typeof SurmeIzolasyonRoute
  YesilCatiZeminleriRoute: typeof YesilCatiZeminleriRoute
  ZeminKaplamaRoute: typeof ZeminKaplamaRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/zemin-kaplama': { id: '/zemin-kaplama'; path: '/zemin-kaplama'; fullPath: '/zemin-kaplama'; preLoaderRoute: typeof ZeminKaplamaRouteImport; parentRoute: typeof rootRouteImport }
    '/yesil-cati-zeminleri': { id: '/yesil-cati-zeminleri'; path: '/yesil-cati-zeminleri'; fullPath: '/yesil-cati-zeminleri'; preLoaderRoute: typeof YesilCatiZeminleriRouteImport; parentRoute: typeof rootRouteImport }
    '/surme-izolasyon': { id: '/surme-izolasyon'; path: '/surme-izolasyon'; fullPath: '/surme-izolasyon'; preLoaderRoute: typeof SurmeIzolasyonRouteImport; parentRoute: typeof rootRouteImport }
    '/sayfa/$slug': { id: '/sayfa/$slug'; path: '/sayfa/$slug'; fullPath: '/sayfa/$slug'; preLoaderRoute: typeof SayfaSlugRouteImport; parentRoute: typeof rootRouteImport }
    '/referanslar': { id: '/referanslar'; path: '/referanslar'; fullPath: '/referanslar'; preLoaderRoute: typeof ReferanslarRouteImport; parentRoute: typeof rootRouteImport }
    '/projeler': { id: '/projeler'; path: '/projeler'; fullPath: '/projeler'; preLoaderRoute: typeof ProjelerRouteImport; parentRoute: typeof rootRouteImport }
    '/polyurea': { id: '/polyurea'; path: '/polyurea'; fullPath: '/polyurea'; preLoaderRoute: typeof PolyureaRouteImport; parentRoute: typeof rootRouteImport }
    '/poliuretan': { id: '/poliuretan'; path: '/poliuretan'; fullPath: '/poliuretan'; preLoaderRoute: typeof PoliuretanRouteImport; parentRoute: typeof rootRouteImport }
    '/iletisim': { id: '/iletisim'; path: '/iletisim'; fullPath: '/iletisim'; preLoaderRoute: typeof IletisimRouteImport; parentRoute: typeof rootRouteImport }
    '/haberler': { id: '/haberler'; path: '/haberler'; fullPath: '/haberler'; preLoaderRoute: typeof HaberlerRouteImport; parentRoute: typeof rootRouteImport }
    '/haberler/$slug': { id: '/haberler/$slug'; path: '/haberler/$slug'; fullPath: '/haberler/$slug'; preLoaderRoute: typeof HaberlerSlugRouteImport; parentRoute: typeof HaberlerRouteImport }
    '/galeri': { id: '/galeri'; path: '/galeri'; fullPath: '/galeri'; preLoaderRoute: typeof GaleriRouteImport; parentRoute: typeof rootRouteImport }
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute, GaleriRoute, HaberlerRoute, IletisimRoute, PoliuretanRoute,
  PolyureaRoute, ProjelerRoute, ReferanslarRoute, SayfaSlugRoute,
  SurmeIzolasyonRoute, YesilCatiZeminleriRoute, ZeminKaplamaRoute,
}
// Haberler slug child'i parent'a bagla
HaberlerRoute.addChildren({ HaberlerSlugRoute })

export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
