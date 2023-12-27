import CopySnippet from '~components/CopySnippet'

interface CodeProps {
  codeString: string
  children: React.ReactNode
}

export default function CodeWrapper({ codeString, children }: CodeProps) {
  return (
    <div className="rounded-lg font-mono font-normal tracking-normal">
      <header className="flex items-center justify-between gap-4 rounded-t-xl bg-overlay-11 px-4 py-2">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-danger-9" />
            <span className="h-3 w-3 rounded-full bg-warning-9" />
            <span className="h-3 w-3 rounded-full bg-success-9" />
          </div>
        </div>
        <div>
          <CopySnippet codeString={codeString} />
        </div>
      </header>
      <aside className="max-h-120 overflow-auto overscroll-contain rounded-b-xl bg-overlay-8 p-4">
        {children}
      </aside>
    </div>
  )
}
