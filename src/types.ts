import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  className?: string
  children: ReactNode
  disabled?: boolean
}

export interface Content {
    id: number
    title: string
    description: string
    titleUpdatedAt: string
    descriptionUpdatedAt: string
  }