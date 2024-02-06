import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react' 

interface NoteCardProps {
  note: {  
    date: Date
    content: string
  }
}

export function NoteCard({ note }: NoteCardProps) {
    return (
      <Dialog.Root>  
        <Dialog.Trigger className='rounded-md 
                        text-left
                        flex flex-col
                        bg-slate-800 
                        p-5 gap-4 
                        overflow-hidden 
                        relative
                        hover:ring-2
                        focus-visible:ring-2
                        focus-visible:ring-blue-700
                        '>
            <span className='text-sm font-medium text-slate-300'>
                {note.date.toISOString()}
            </span>
            <p className='text-sm leading-6 text-slate-400'>
                {note.content}
            </p>

            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
        
        </Dialog.Trigger>
      
        <Dialog.Portal>
            <Dialog.Overlay className='inset-0 fixed bg-black/50' />
            <Dialog.Content className='fixed left-1/2 top-1/2 
                                        overflow-hidden
                                        -translate-x-1/2 
                                        -translate-y-1/2 
                                        max-w-[640px]
                                        w-full
                                        h-[60vh]
                                        bg-slate-700
                                        rounded-md flex flex-col
                                        outline-none'>
                <Dialog.Close className='absolute right-0 top-0 hover:bg-red-700 bg-slate-800 text-slate-500'>
                    <X />
                </Dialog.Close>

                <div className='flex flex-1 flex-col gap-3 p-5'>
                    <span className='text-sm font-medium text-slate-300'>
                        Criado: {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
                    </span>
                    <p className='text-sm leading-6 text-slate-400'>
                        {note.content}
                    </p>
                </div>

                <button type="button" className='w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium group'>
                    Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota?</span>
                </button>
            </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
}