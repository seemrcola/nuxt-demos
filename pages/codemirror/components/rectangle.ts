import type CodeMirror from 'codemirror'

// 框选效果处理成矩形

function sortedSelection({ anchor, head }: any) {
  if (anchor.line === head.line) {
    if (anchor.ch < head.ch)
      return { anchor: head, head: anchor }
  }
  else {
    if (anchor.line < head.line)
      return { anchor: head, head: anchor }
  }
  return { anchor, head }
}

function squareRanges({ head, anchor }: any) {
  const l_start = Math.min(head.line, anchor.line)
  const l_end = Math.max(head.line, anchor.line)
  const c_start = Math.min(head.ch, anchor.ch)
  const c_end = Math.max(head.ch, anchor.ch)
  const result = []
  for (let line = l_start; line <= l_end; line++) {
    result.push({
      head: { line, ch: c_start },
      anchor: { line, ch: c_end },
    })
  }
  return result
}

export function rectangle(editor: CodeMirror.Editor) {
  editor.on('beforeSelectionChange', (_, event) => {
    const ranges = event.ranges
    if (ranges.length) {
      const head = sortedSelection(ranges[0]).head
      const anchor = sortedSelection(ranges[ranges.length - 1]).anchor
      // @ts-expect-error
      event.update(squareRanges({ head, anchor }))
    }
  })
}
