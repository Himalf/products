import React from 'react'
import { CgFormatLineHeight } from 'react-icons/cg';
import { useParams } from 'react-router-dom'

type Props = {}

export default function ProductDetail({}: Props) {
    const id = useParams();
    console.log(id)
  return (
    <div>ProductDetail</div>
  )
}