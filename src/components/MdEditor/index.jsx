import React, { Component, useEffect, useState } from 'react'

import SimpleMDE from 'react-simplemde-editor'
import './easymde.min.css'
import Vditor from 'vditor'
import "vditor/dist/index.css";
import { translateMarkdown2html } from '@/utils'

function MdEditor(props) {
  const { value } = props;
  const [vd, setVd] = useState();

  useEffect(() => {
    const vditor = new Vditor("vditor", {
      value: props.value,
      after() {
        if (props.value) {
          vditor.setValue(props.value);
        }
        setVd(vditor);
      },
      input: (value) => props.onChange(value),
      cache: { id: 'vditor' },
      height: '650px',
      counter: { enable: true },
      placeholder: `快捷编辑（仅支持 PC 端）
1. Emoji：Ctrl+ E
2. F11：全屏
3. Ctrl + V / 拖拽：上传图片
4. Alt + S / R：开始 / 结束录音`,
      upload: {
        url: 'http://39.106.132.8:6060/uploads/file',
        fieldName: 'file',
        extraData: { packet: 'blog' },
        format: (files, responseTxt) => {
          const res = JSON.parse(responseTxt);
          const name = files[0].name;
          const url = 'http://39.106.132.8:6060/' + res.data.url;
          const result = JSON.stringify({ code: 0, data: { errFiles: '', succMap: { [name]: url } } });
          return result;
        },
      }
    });
  }, [])

  return (
    <>
      <div id="vditor" className="vditor" />
    </>
  )
}

export default MdEditor
