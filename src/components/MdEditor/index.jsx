import React, { Component, useEffect, useState } from 'react'

import SimpleMDE from 'react-simplemde-editor'
import './easymde.min.css'
import Vditor from 'vditor'
import "vditor/dist/index.css";
import { translateMarkdown2html } from '@/utils'

function MdEditor(props) {
  const { value } = props;
  useEffect(() => {
    const vditor = new Vditor("vditor", {
      value: value || " ",
      after() {
        vditor.setValue(value);
      },
      input: (value) => props.onChange(value),
      cache: { id: 'vditor' },
      height: '500px',
      counter: { enable: true },
      upload: {
        url: 'http://127.0.0.1:6060/uploads/file',
        fieldName: 'file',
        extraData: { packet: 'blog' },
        format: (files, responseTxt) => {
          const res = JSON.parse(responseTxt);
          const name = files[0].name;
          const url = res.data.url;
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
