import type { PortfolioMode } from '~~/shared/types'

export const usePortfolioMode = () => useState<PortfolioMode>('portfolio-mode', () => 'product')
