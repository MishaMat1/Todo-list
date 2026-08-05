import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Help({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col gap-4 p-5 max-w-xl">
      <button
        onClick={onBack}
        className="self-start text-sky-600 hover:bg-transparent p-0"
      >
        <ArrowBackIosIcon />
        <span>Back</span>
      </button>

      <h1 className="text-2xl font-bold text-slate-800">
        How to use Awesome Todo
      </h1>

      <p className="text-slate-600 leading-relaxed">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
        Modi expedita distinctio totam magnam, quaerat numquam 
        minus delectus. Eligendi mollitia obcaecati expedita error 
        illum, soluta in earum aliquam vero deleniti ex?
      </p>
    </div>
  );
}