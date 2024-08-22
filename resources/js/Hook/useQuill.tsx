import React, { MutableRefObject } from 'react';
import Quill from 'quill';
import { Editor } from 'primereact/editor';

export default function useQuill(refEditor: MutableRefObject<Editor | null>) {
  const Sizes = ['8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '22px'/*, '24px', '26px', '28px', '36px'*/];
  const Size = Quill.import('attributors/style/size');
  Size.whitelist = Sizes;

  const Fonts = ['ariel', 'sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'];
  const Font = Quill.import('attributors/class/font');
  Font.whitelist = Fonts;

  Quill.register(Size, true);
  Quill.register(Font, true);

  const keyboardBindings = {
    backspaceParams: {
      key: 'Backspace',
      handler: (range: any, context: any) => {
        const _quill = refEditor.current?.getQuill();
        if (context.prefix.charAt(context.offset - 1) === '}') {
          const _start = context.prefix.lastIndexOf('{');
          if (RegExp(/{{\w+}}/).test(context.prefix.substring(_start - 1, context.offset))) {
            _quill.deleteText(_start, context.offset - _start);
          }
        }
        return true;
      }
    }
  };

  const modules = {
    keyboard: { bindings: keyboardBindings }
  };

  const renderHeader = () => (
    <>
      <span className="ql-formats">
        <select className="ql-font" aria-label="Font">
          {Fonts.map(item => (<option value={item}>{item}</option>))}
        </select>
        <select className="ql-size" aria-label="Size">
          {Sizes.map(item => (<option value={item}>{item.replace('px', '')}</option>))}
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <button className="ql-strike" aria-label="Strike"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-list" aria-label="Ordered" value="ordered"></button>
        <button className="ql-list" aria-label="Bullet" value="bullet"></button>
        <button className="ql-list" aria-label="Check" value="check"></button>
      </span>
      <span className="ql-formats">
        <select className="ql-color" aria-label="Color"></select>
        <select className="ql-background" aria-label="Background"></select>
      </span>
      <span className="ql-formats">
        <select className="ql-align" aria-label="Align"></select>
        <button className="ql-indent" aria-label="Indent" value="-1"></button>
        <button className="ql-indent" aria-label="indent" value="+1"></button>
      </span>
    </>
  );

  return { modules, renderHeader };
}
