export const createMockDataTrackingTask = (): TrackingTask[] => {
  const names = [
    'Nguyễn Văn An',
    'Trần Thị Bích',
    'Lê Văn Cường',
    'Phạm Thị Dung',
    'Hoàng Văn Em',
    'Đặng Thị Hoa',
    'Vũ Minh Hoàng',
    'Bùi Thị Hạnh',
    'Ngô Quang Huy',
    'Đỗ Thị Kim',
  ]

  const positions = [
    'Nhân viên kinh doanh',
    'Chuyên viên marketing',
    'Kế toán viên',
    'Trưởng nhóm kỹ thuật',
    'Chuyên viên nhân sự',
    'Nhân viên chăm sóc khách hàng',
    'Lập trình viên',
    'Quản lý dự án',
    'Nhân viên kiểm thử',
    'Trưởng phòng kinh doanh',
  ]

  const departments = [
    'Phòng Kinh doanh',
    'Phòng Marketing',
    'Phòng Kế toán',
    'Phòng Kỹ thuật',
    'Phòng Nhân sự',
    'Phòng Chăm sóc khách hàng',
    'Phòng IT',
    'Phòng Quản lý Dự án',
    'Phòng Kiểm thử',
    'Phòng Điều hành',
  ]

  const nextTasks = [
    'Xem chi tiết công việc',
    'Đánh giá công việc',
    'Từ chối công việc',
  ]

  const mockData: TrackingTask[] = []

  for (let i = 1; i <= 30; i++) {
    mockData.push({
      name: names[i % names.length],
      position: positions[i % positions.length],
      department: departments[i % departments.length],
      createdDate: `2025-04-${(i % 30 || 1).toString().padStart(2, '0')}`,
      nextTask: nextTasks[i % nextTasks.length],
    })
  }

  return mockData
}
