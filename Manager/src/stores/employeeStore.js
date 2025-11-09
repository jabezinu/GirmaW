import { create } from 'zustand'

const initialForm = {
  name: '',
  phone: '',
  position: 'waiter',
  salary: '',
  description: '',
  workingHour: '',
  tableAssigned: '',
  status: 'active',
}

const getInitialEmployees = () => {
  const stored = localStorage.getItem('employees');
  return stored ? JSON.parse(stored) : [
    {
      _id: '1',
      name: 'John Doe',
      phone: '1234567890',
      position: 'waiter',
      salary: '1500',
      description: 'Experienced waiter',
      workingHour: '9-5',
      tableAssigned: 'Table 1',
      status: 'active',
      image: '',
      dateHired: new Date().toISOString()
    },
    {
      _id: '2',
      name: 'Jane Smith',
      phone: '0987654321',
      position: 'cashier',
      salary: '1600',
      description: 'Reliable cashier',
      workingHour: '10-6',
      tableAssigned: '',
      status: 'active',
      image: '',
      dateHired: new Date().toISOString()
    }
  ];
};

export const useEmployeeStore = create((set, get) => ({
  employees: getInitialEmployees(),
  loading: false,
  error: null,
  actionLoading: false,
  form: initialForm,
  editId: null,
  showForm: false,
  showFired: false,
  setShowForm: (val) => set({ showForm: val }),
  setShowFired: (val) => set({ showFired: val }),
  setForm: (form) => set({ form }),
  setEditId: (id) => set({ editId: id }),
  setActionLoading: (val) => set({ actionLoading: val }),
  setField: (name, value) => set(state => ({ form: { ...state.form, [name]: value } })),
  resetForm: () => set({ form: initialForm, editId: null }),

  fetchEmployees: async () => {
    set({ loading: true });
    setTimeout(() => {
      const employees = getInitialEmployees();
      set({ employees, error: null, loading: false });
    }, 500);
  },

  openCreate: () => {
    set({ form: initialForm, editId: null, showForm: true });
  },

  openEdit: (emp) => {
    set({
      form: {
        name: emp.name || '',
        phone: emp.phone || '',
        position: emp.position || 'waiter',
        salary: emp.salary || '',
        description: emp.description || '',
        workingHour: emp.workingHour || '',
        tableAssigned: emp.tableAssigned || '',
        status: emp.status || 'active',
        image: emp.image || '',
      },
      editId: emp._id,
      showForm: true,
    });
  },

  handleSubmit: async (e) => {
    e.preventDefault();
    set({ actionLoading: true });
    const { form, editId, fetchEmployees, setShowForm } = get();
    try {
      const employees = get().employees;
      if (editId) {
        // Update existing employee
        const updatedEmployees = employees.map(emp =>
          emp._id === editId ? { ...emp, ...form, _id: editId } : emp
        );
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        set({ employees: updatedEmployees });
      } else {
        // Add new employee
        const newEmployee = {
          ...form,
          _id: Date.now().toString(),
          dateHired: new Date().toISOString()
        };
        const updatedEmployees = [...employees, newEmployee];
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        set({ employees: updatedEmployees });
      }
      setShowForm(false);
      fetchEmployees();
    } catch {
      alert('Failed to save employee');
    } finally {
      set({ actionLoading: false });
    }
  },

  handleDelete: async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    set({ actionLoading: true });
    try {
      const employees = get().employees.filter(emp => emp._id !== id);
      localStorage.setItem('employees', JSON.stringify(employees));
      set({ employees });
    } catch {
      alert('Failed to delete employee');
    } finally {
      set({ actionLoading: false });
    }
  },
}))
